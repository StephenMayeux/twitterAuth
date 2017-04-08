const path = require('path');
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
require('dotenv').config();

passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    // check to see if user had logged in before
    // if user does not exist in db, write new user record and return cb
    // otherwise if user exists, just return the callback
    // handle any possible errors
    return cb(null, profile);
  })
);

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const routes = require('./routes');
routes(app, passport);

app.listen(process.env.PORT || 3000, () => console.log('Running express server'));
