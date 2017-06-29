'use strict';

const User = require('./user');
const Client = require('./client');

class Token {
  constructor(obj) {
    this.accessToken = obj.accessToken;
    this.accessTokenExpiresAt = obj.accessTokenExpiresAt;
    this.refreshToken = obj.refreshToken;
    this.refreshTokenExpiresAt = obj.refreshTokenExpiresAt;
    this.user = new User(obj.user);
    this.client = new Client(obj.client);
  }
}

module.exports = Token;
