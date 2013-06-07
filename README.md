## In process: proceed with caution  

Notable TODOs:  

1.  ~~Hook up Mailchimp via API~~  
2.  ~~Add API keys via settings.json~~
3.  Security review & double check
4.  Better error handling from Mailchimp API
5.  Documentation + finish "getting started" tutorial 
 
## meteor-coming-soon-email-capture  
The goal of this project is threefold:  

1. To provide a simple "coming soon" landing page with an email capture form (like the old LaunchRock) that integrates with Mailchimp.  

2. Improve the signup experience by using the Mailchimp API instead of the standard Mailchimp embed code (requires server side code to hide your API keys). We'll make an AJAX call to the API, and upon success provide a simple "thank you" message in-app (instead of a jarring redirect to a Mailchimp success page).  

3. Host it for free.

This project merges a popular [ruby on rails project](https://github.com/RailsApps/rails-prelaunch-signup) with a [meteor sample app](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app). Its sole purpose was to give me a reason to check out Meteor and improve my javascript skills, but hopefully you can find value in it.

### Screenshots

![Landing Page](https://github.com/chadokruse/rails-prelaunch-signup-1click/raw/master/screenshot-main.png)
![Error State](https://github.com/chadokruse/rails-prelaunch-signup-1click/raw/master/screenshot-error.png)
![Success State](https://github.com/chadokruse/rails-prelaunch-signup-1click/raw/master/screenshot-success.png)

### Changes to [original meteor app](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app)
1. Emails submitted will also be added to a Mailchimp account (in addition to the db), using [double opt-in](http://kb.mailchimp.com/article/how-does-confirmed-optin-or-double-optin-work).
2. Added Twitter Bootstrap and updated design.

See [original README](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app) for further details on the app. The fine folks at [Frozen Ridge](http://frozenridge.co/) also put together a great [blog post](http://blog.mongolab.com/2013/05/build-your-own-lead-capture-page-with-meteor-and-mongolab-in-minutes/) detailing how they built the app.

## Getting started

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

### Demo
Coming soon

### Usage
Coming soon


## Disclaimer  

This code is provided "as is" with no warranties. It'll probably break and may expose your api keys. Proceed with caution.

### License

Do with it as you wish, commercial or otherwise. If you like formal licenses: Copyright (c) 2013 Chad Kruse, released under the MIT license.
