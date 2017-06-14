'use strict';

const User = require('./user');
const Client = require('./client');

class AuthorizationCode {
  constructor(obj) {
    this.authorizationCode = obj.authorizationCode;
    this.scope = obj.scope;
    this.expiresAt = obj.expiresAt;
    this.redirectUri = obj.redirectUri;
    this.client = new Client(obj.client);
    this.user = new User(obj.user);
  }
}

module.exports = AuthorizationCode;
