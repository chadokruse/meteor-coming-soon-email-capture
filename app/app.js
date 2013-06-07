Emails = new Meteor.Collection("emails")

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Github account usernames of admin users
var ADMIN_USERS = ['chadokruse'];
function isAdmin() {
  try {
    return ADMIN_USERS.indexOf(Meteor.user().services.github.username) !== -1
  } catch(e) {
    return false;
  }
}

if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('emails');
  Template.footer.events({
    'click .login' : function(evt, tmpl){
      Meteor.loginWithGithub();
      return false;
    },

    'click .admin' : function(evt, tmpl){
      Session.set("showAdmin", !Session.get("showAdmin"));
    }
   })

  Template.signup.events({
    'submit form' : function (evt, tmpl) {
      console.log("Form Input Button Clicked!");
      var email = tmpl.find('#email-for-mailchimp').value
      , doc = {email: email, referrer: document.referrer, timestamp: new Date()}

      if (EMAIL_REGEX.test(email)){
        Session.set("showBadEmail", false);
        console.log("REGEX Test Passed");

        Meteor.call('fetchFromService', email, function(err, respJson) {
        if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err );
          Session.set("showBadEmail", true);
        } else {
          console.log("respJson: ", respJson);
          //window.alert(respJson.length + ' tweets received.');
          
        }
      });
        
        Emails.insert(doc);
        console.log("Posted to db")
        Session.set("emailSubmitted", true);
        
      } else {
        Session.set("showBadEmail", true);
        console.log("REGEX Test Failed")
      }
      return false;

    }
  });

  Template.signup.showBadEmail = function () {
    return Session.get("showBadEmail");
  };

  Template.signup.emailSubmitted = function () {
    return Session.get("emailSubmitted");
  };

  Template.footer.isAdmin = isAdmin;

  Template.main.showAdmin = function() {
    return Session.get("showAdmin");
  };

  Template.admin.emails = function() {
    return Emails.find().fetch();
  };

}

if (Meteor.isServer) {
  // Mailchimp API Call
  Meteor.methods({
    fetchFromService: function(email) {
      var apiKey = Meteor.settings.mailchimpApiKey;
      var listId = Meteor.settings.mailchimpListId;
      var url = "http://us5.api.mailchimp.com/1.3/?method=listSubscribe&apikey="+ apiKey +"&id="+ listId +"&email_address="+ encodeURIComponent(email) +"&output=json";
      //synchronous POST
      var result = Meteor.http.post(url, {timeout:30000});
      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        console.log("response received.");
        return respJson;
      } else {
        // TODO: Add better error handling
        //if(result.statusCode==502) {
        //  some stuff;
        //} else {
        //  some stuff;
        //}
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    }
  });

  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
      {fields: {'services.github.username': 1, 'username':1}});
  });

  Meteor.publish("emails", function() {
    if (isAdmin) {
      return Emails.find();
    }
  });
  Meteor.startup(function () {
  });

}
