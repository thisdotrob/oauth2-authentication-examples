'use strict';

const Client = require('./client');

module.exports = {
  client: new Client({
    id: 'client',
    grants: ['client_credentials'],
    redirectUris: [
      'http://localhost:4000/auth/callback',
      'http://localhost:4000/nonsense',
      'http://localhost:4000/other',
    ],
    clientSecret: 'secret',
    user_id: '1',
  }),
};
