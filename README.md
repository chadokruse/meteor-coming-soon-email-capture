## In process: proceed with caution  

Notable TODOs:  

1.  ~~Hook up Mailchimp via API~~  
2.  ~~Add API keys via settings.json~~
3.  Security review & double check
4.  Better error handling from Mailchimp API
5.  ~~Documentation + finish "getting started" tutorial~~

Wishlist:

1.  Custom "thank you" landing page (after user clicks the email confirmation link)
 
## meteor-coming-soon-email-capture  
The goal of this project is threefold:  

1. To provide a simple "coming soon" landing page with an email capture form (like the old LaunchRock) that integrates with Mailchimp.  

2. Improve the signup experience by using the Mailchimp API instead of the standard Mailchimp embed code (requires server side code to hide your API keys). We'll make an AJAX call to the API, and upon success provide a simple "thank you" message in-app (instead of a jarring redirect to a Mailchimp success page).  

3. Host it for free.

This project merges a popular [ruby on rails project](https://github.com/RailsApps/rails-prelaunch-signup) with a [meteor sample app](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app). Its sole purpose was to give me a reason to check out Meteor and improve my javascript skills, but hopefully you can find value in it.

### Demo
[Live demo](https://github.com/chadokruse/meteor-coming-soon-email-capture)  
Please go easy on my Mailchimp account. I'll try to flush out any subscribed emails from time to time.

### Screenshots

![Landing Page](https://github.com/chadokruse/rails-prelaunch-signup-1click/raw/master/screenshot-main.png)
![Error State](https://github.com/chadokruse/rails-prelaunch-signup-1click/raw/master/screenshot-error.png)
![Success State](https://github.com/chadokruse/rails-prelaunch-signup-1click/raw/master/screenshot-success.png)

### Changes to [original meteor app](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app)
1. Emails submitted will also be added to a Mailchimp account (in addition to the db), using [double opt-in](http://kb.mailchimp.com/article/how-does-confirmed-optin-or-double-optin-work).
2. Added Twitter Bootstrap and a freely-usable placeholder design.

See [original README](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app) for further details on the app. The fine folks at [Frozen Ridge](http://frozenridge.co/) also put together a great [blog post](http://blog.mongolab.com/2013/05/build-your-own-lead-capture-page-with-meteor-and-mongolab-in-minutes/) detailing how they built the app.

## Getting started

*Note: I'm a beginner, and these instructions are intended to help other beginners get up and rolling quickly.*

You need to have Node.js and Meteor installed.

### Node  

I use Homebrew and found [this tutorial](http://madebyhoundstooth.com/blog/install-node-with-homebrew-on-os-x/) helpful.  

### Meteor

Install Meteor:

`curl https://install.meteor.com | sh`

cd into the app

`cd what/ever/your/path/is/meteor-coming-soon-email-capture/app`

Start Meteor

`meteor`

Open the app in your browser

`http://localhost:3000/`

### Usage
1.  **Insert your Mailchimp credentials**  
These are located in `settings.json.example`. Be sure to save the new file as `settings.json` (e.g. remove the "example" extension).  
Note: Here's [how to find your API Key](http://kb.mailchimp.com/article/where-can-i-find-my-api-key), and here's [how to find your List ID](http://kb.mailchimp.com/article/how-can-i-find-my-list-id).  

2.  **Load your settings.json file**   
`meteor --settings settings.json`  
Note: Be sure meteor is not already running  

3.  **Change default admin usernames**  
Located in app.js - line 6   
```
var ADMIN_USERS = ['someusername', 'anotherperson', 'howaboutathird'];
```  
Enter your github username

That's it. Add your email to the form and hit submit. You should receive an email confirmation from Mailchimp if all is well.

Note: Error handling from Mailchimp responses are NOT hooked up yet, so if you test using test@example.com, it'll write to the db but Mailchimp will throw an error (Mailchimp doesn't like anything@example.com).


## Disclaimer  

This code is provided "as is" with no warranties. It'll probably break and may expose your api keys. Proceed with caution.

### License

Do with it as you wish, commercial or otherwise. If you like formal licenses: Copyright (c) 2013 Chad Kruse, released under the MIT license.  

See [original meteor app](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app) for licensing covering their work (github login, add email form entry to db, etc.)

### Credits

Original meteor app and awesome tutorial was created by [niallo](https://github.com/niallo) and [peterbraden](https://github.com/peterbraden) of [Frozen Ridge](http://frozenridge.co/).

[This gist](https://gist.github.com/nachiket-p/2922814) from [nachiket-p](https://github.com/nachiket-p) helped me understand how external API calls work in Meteor.




