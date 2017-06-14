'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const Strategy = require('./strategy');

const app = express();

app.use(
  session({
    name: 'client.connect.sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const verify = (accessToken, refreshToken, profile, verified) =>
  verified(null, profile);

const strategy = new Strategy(
  {
    authorizationURL: 'http://localhost:3000/authorize',
    tokenURL: 'http://localhost:3000/token',
    clientID: 'client',
    clientSecret: 'secret',
    callbackURL: 'http://localhost:4000/auth/callback',
    profileURL: 'http://localhost:3000/profile',
  },
  verify,
);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.session && (req.session.returnTo = req.originalUrl || req.url);
    return res.redirect('/auth/login');
  }
  next();
};

const authenticate = passport.authenticate('custom-oauth', {
  successReturnToOrRedirect: '/secure',
  failureRedirect: '/login',
  state: 'state',
});

app.get('/secure', checkLoggedIn, (req, res) =>
  res.status(200).send(`Logged in as: ${JSON.stringify(req.user)}`),
);

app.get('/auth/login', authenticate);

app.get('/auth/callback', authenticate, (req, res) =>
  res.redirect((req.session && req.session.returnTo) || '/'),
);

const client = app.listen(4000, (obj) => {
  console.info('Client listening on port %d', client.address().port);
});
