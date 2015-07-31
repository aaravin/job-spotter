var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var path = require('path');
// add database user controller here for storing users

// OAuth - LinkedIn
var passport = require('passport');
var config = require('./oauthKeys.js');

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LinkedInStrategy({
  clientID: config.linkedin.clientID,
  clientSecret: config.linkedin.clientSecret,
  callbackURL: path.join('//auth/linkedin/callback"),
  scope: ['r_emailaddress', 'r_basicprofile', 'rw_company_admin', 'w_share'],
  state: true
}, function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect... 
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to 
    // represent the logged-in user. In a typical application, you would want 
    // to associate the LinkedIn account with a user record in your database, 
    // and return that user instead. 
    return done(null, profile);
  });
}));

router.get('/auth/linkedin', passport.authenticate('linkedin'),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this 
    // function will not be called. 
  });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
