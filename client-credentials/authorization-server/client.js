'use strict';

class Client {
  constructor(obj) {
    this.id = obj.id;
    this.clientSecret = obj.clientSecret;
    this.grants = obj.grants;
    this.redirectUris = obj.redirectUris;
  }
}

module.exports = Client;
