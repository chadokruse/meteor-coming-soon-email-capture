Emails = new Meteor.Collection("emails");

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Github account usernames of admin users
var ADMIN_USERS = ['someusername', 'anotherperson', 'howaboutathird'];
function isAdmin() {
  try {
    return ADMIN_USERS.indexOf(Meteor.user().services.github.username) !== -1;
  } catch(e) {
    return false;
  }
}


if (Meteor.isClient) {
  // Routes
  Router.map(function () {
    // home page
    this.route('landing', {
      path: '/',
    });
    // admin page
    this.route('admin', {
      onBeforeAction: function () {
        if (!isAdmin())
          this.render('adminLogin');
        else
          this.next();
      },
      path: '/admin'
    });
  });
  // End Routes

  Meteor.subscribe('userData');
  Meteor.subscribe('emails');
  Template.admin.events({
    'click .login' : function(evt, tmpl){
      Meteor.loginWithGithub();
      return false;
    },
    /* Since we're now using a separate admin page, we can remove the "toggle admin" feature used in the original tutorial
    'click .admin' : function(evt, tmpl){
      Session.set("showAdmin", !Session.get("showAdmin"));
    }
    */
  });

  Template.signup.events({
    'submit form' : function (evt, tmpl) {
      console.log("Form Input Button Clicked");
      var email = tmpl.find('#email-for-mailchimp').value;
      var doc = {email: email, referrer: document.referrer, timestamp: new Date()};

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
        }
      });

        Emails.insert(doc);
        console.log("Posted to db");
        Session.set("emailSubmitted", true);

      } else {
        Session.set("showBadEmail", true);
        console.log("REGEX Test Failed");
      }
      return false;

    }
  });

  Template.signup.helpers({
    showBadEmail: function () {
      return Session.get("showBadEmail");
    },
    emailSubmitted: function () {
      return Session.get("emailSubmitted");
    }
  });

  Template.admin.helpers({
    showAdmin: function() {
      return Session.get("showAdmin");
    },
    emails: function() {
      return Emails.find().fetch();
    },
    isAdmin: function() {
      return isAdmin;
    }
  });
}


if (Meteor.isServer) {

  // Mailchimp API Call
  Meteor.methods({
    fetchFromService: function(email) {
      var apiKey = Meteor.settings.mailchimpApiKey;
      var listId = Meteor.settings.mailchimpListId;
      var apiEndPoint = apiKey.slice(-3); // Pull appropriate api endpoint datacenter from apiKey http://apidocs.mailchimp.com/api/rtfm/#api-endpoints
      var url = "http://"+ apiEndPoint +".api.mailchimp.com/1.3/?method=listSubscribe&apikey="+ apiKey +"&id="+ listId +"&email_address="+ encodeURIComponent(email) +"&output=json";
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

  // Github Login
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
      {fields: {'services.github.username': 1, 'username':1}});
  });

  // Admin Email Subscriber View
  Meteor.publish("emails", function() {
    if (isAdmin) {
      return Emails.find();
    }
  });
  Meteor.startup(function () {
  });

}
