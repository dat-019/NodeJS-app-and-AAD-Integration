var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var graph = require('./graph');

// Configure simple-oauth2
const oauth2 = require('simple-oauth2').create({
    client: {
      id: '38b723d2-0132-413f-aaf6-66027fed95e7', //'30c463a5-ca3b-4bb8-b7e4-3bb224809b89',  //process.env.OAUTH_APP_ID,
      secret: '.T]4efUWjK:Hi/0tOrdpThKyWxM8Q1?W' // '93f33571-550f-43cf-b09f-cd331338d086' // process.env.OAUTH_APP_PASSWORD
    },
    auth: {
      tokenHost: 'https://login.microsoftonline.com/common', //process.env.OAUTH_AUTHORITY,
      authorizePath: '/oauth2/v2.0/authorize', // process.env.OAUTH_AUTHORIZE_ENDPOINT,
      tokenPath: '/oauth2/v2.0/token' //process.env.OAUTH_TOKEN_ENDPOINT
    }
  });

  // In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
var users = {};

// Passport calls serializeUser and deserializeUser to
// manage users
passport.serializeUser(function(user, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done (null, user.profile.oid);
});

passport.deserializeUser(function(id, done) {
  done(null, users[id]);
});

// Callback function called once the sign-in is complete
// and an access token has been obtained
async function signInComplete(iss, sub, profile, accessToken, refreshToken, params, done) {
    if (!profile.oid) {
        console.log("No OID found in user profile");
      return done(new Error("No OID found in user profile."), null);
    }
  
    try{
      const user = await graph.getUserDetails(accessToken);
      console.log(user);
  
      if (user) {
        // Add properties to profile
        profile['email'] = user.mail ? user.mail : user.userPrincipalName;
      }
    } catch (err) {
        console.log(err);    
      done(err, null);
    }
  
    // Create a simple-oauth2 token from raw tokens
    let oauthToken = oauth2.accessToken.create(params);
  
    // Save the profile and tokens in user storage
    users[profile.oid] = { profile, oauthToken };
    return done(null, users[profile.oid]);
  }

  // Configure OIDC strategy
passport.use(new OIDCStrategy(
    {
      identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', // `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
      clientID: '38b723d2-0132-413f-aaf6-66027fed95e7',// '30c463a5-ca3b-4bb8-b7e4-3bb224809b89', // process.env.OAUTH_APP_ID,
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl: 'http://localhost:3000/auth/callback', //process.env.OAUTH_REDIRECT_URI,
      allowHttpForRedirectUrl: true,
      clientSecret: '.T]4efUWjK:Hi/0tOrdpThKyWxM8Q1?W', // '93f33571-550f-43cf-b09f-cd331338d086', //process.env.OAUTH_APP_PASSWORD,
      validateIssuer: false,
      passReqToCallback: false,
      loggingNoPII: false,
      // scope: ['profile', 'offline_access', 'user.read'] //process.env.OAUTH_SCOPES.split(' ')
      scope: ['profile', '.default', 'offline_access']
    },
    signInComplete
  ));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var calendarRouter = require('./routes/calendar');

var session = require('express-session');
var flash = require('connect-flash');

var app = express();

app.use(session({
    secret: 'poc!@#$%',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
  }));

// Flash middleware
app.use(flash());
// Set up local vars for template layout
app.use(function(req, res, next) {
    // Read any flashed errors and save
    // in the response locals
    res.locals.error = req.flash('error_msg');
  
    // Check for simple error string and
    // convert to layout's expected format
    var errs = req.flash('error');
    for (var i in errs){
      res.locals.error.push({message: 'An error occurred', debug: errs[i]});
    }
  
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/calendar', calendarRouter);

module.exports = app;
