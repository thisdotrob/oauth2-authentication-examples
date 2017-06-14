'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const OAuthServer = require('express-oauth-server');
const { Strategy } = require('passport-local');

const model = require('./model');

const oauth = new OAuthServer({ model, useErrorHandler: true });

const app = express();

app.use(
  session({
    name: 'server.connect.sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

const verify = (username, password, done) =>
  done(null, model.getUser(username, password));

const strategy = new Strategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.session && (req.session.returnTo = req.originalUrl || req.url);
    return res.redirect('/login');
  }
  next();
};

const authorize = oauth.authorize({
  authenticateHandler: {
    handle: (req, res) => req.user || false,
  },
});

const authenticate = passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
});

app.get('/authorize', checkLoggedIn, authorize);

app.get('/login', (req, res) => res.render('login'));

app.post('/login', authenticate);

app.post('/token', oauth.token());

app.get('/profile', (req, res) => {
  const accessToken = model.getAccessToken(req.query.access_token);
  res.status(200).send((accessToken && accessToken.user) || null);
});

const server = app.listen(3000, () => {
  console.info('Server listening on port %d', server.address().port);
});
