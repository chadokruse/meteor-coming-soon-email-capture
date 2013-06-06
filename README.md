## In process - not for public consumption!  
  
The goal of this project is threefold:  

1. To provide a simple "coming soon" landing page with an email capture form (like the old LaunchRock) that integrates with Mailchimp.  

2. Improve the signup experience by using the Mailchimp API instead of the standard embed code. We'll make an AJAX call to the API, and upon success, provide a simple "thank you" message instead of a jarring redirect to a Mailchimp success page.  

3. Host it for free.

This project merges a popular ruby on rails project with a meteor sample app. The [meteor project's](https://github.com/FrozenRidge/mongolab-meteor-leadcapture-app) README is included below in its entirety:


mongolab-meteor-leadcapture-app
===============================

Sample app &amp; blog post for [MongoLab](http://mongolab.com) / [Meteor](http://meteor.com) integration

This is a simple lead form / CRM for a website. There will be two views:

* Entry view - similar to the lead form on [FrozenRidge.co](http://frozenridge.co)
* Admin view - tablular view of leads

Views will utilize Meteor to update live, in realtime. Backend will be MongoLab.


## Usage

You need to have meteor installed:

`curl https://install.meteor.com | sh`

Now run the app from the `app` directory:

`cd app; meteor`

You should be able to access the app at http://localhost:3000/

```
$ meteor
[[[[[ ~/projects/node/mongolab-meteor-leadcapture-app/app ]]]]]

=> Meteor server running on: http://localhost:3000/
```

## Bundling

To deploy this so it can run with MongoLab, you need to generate the "bundle":

`meteor bundle sample.tar.gz`

This generates a tarball named `sample.tar.gz` which is essentially the meteor
app compiled to Node.JS.

This can then be run just like a normal Node.JS app (`npm install fibers && node main.js`). A MongoLab database can be used by creating a database at
http://mongolab.com and setting the environment variable MONGO_URL to the
MongoDB URI provided by MongoLab. Sandbox plans that give you .5GB of storage
are free.

## Blog Post

A blog post with a detailed walkthrough of the app is at the [MongoLab blog](http://blog.mongolab.com/2013/05/build-your-own-lead-capture-page-with-meteor-and-mongolab-in-minutes/)
