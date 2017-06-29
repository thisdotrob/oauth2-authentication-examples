'use strict';

const AuthorizationCode = require('./authorization-code');
const Token = require('./token');

const clients = require('./clients');
const users = require('./users');
const passwords = require('./passwords');
const tokens = {};
const codes = {};

module.exports = {
  // getAccessToken: accessToken => tokens[accessToken],
  //
  // getRefreshToken: refreshToken => tokens[refreshToken],
  //
  // getAuthorizationCode: authorizationCode => codes[authorizationCode],

  getClient: (id, secret) => {
    const client = clients[id];
    return client && (!secret || client.clientSecret === secret)
      ? client
      : false;
  },

  getUserFromClient: (client) => false,

  // getUser: (username, password) => {
  //   const user = users[username];
  //   return user && passwords[username] === password ? user : false;
  // },
  //
  // saveAuthorizationCode: (data, client, user) => {
  //   const code = new AuthorizationCode(Object.assign(data, { client, user }));
  //   codes[code.authorizationCode] = code;
  //   return code;
  // },
  
  saveToken: (data, client, user) => {
    const token = new Token(Object.assign(data, { client, user }));
    tokens[data.refreshToken] = token;
    tokens[data.accessToken] = token;
    return token;
  },

  // revokeAuthorizationCode: ({ authorizationCode }) => {
  //   return codes[authorizationCode] ? delete codes[authorizationCode] : false;
  // },
};
