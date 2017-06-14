'use strict';

const OAuth2Strategy = require('passport-oauth2').Strategy;
const InternalOAuthError = require('passport-oauth2').InternalOAuthError;

class Strategy extends OAuth2Strategy {
  constructor(options, verify) {
    super(options, verify);
    this.name = 'custom-oauth';
    this._profileURL = options.profileURL;
  }

  userProfile(accessToken, done) {
    var self = this;

    this._oauth2.get(this._profileURL, accessToken, (err, body, res) => {
      if (err) {
        return done(
          new InternalOAuthError('failed to fetch user profile', err),
        );
      }

      try {
        const profile = JSON.parse(body);
        profile.provider = this.name;
        done(null, profile);
      } catch (e) {
        done(e);
      }
    });
  }
}

module.exports = Strategy;
