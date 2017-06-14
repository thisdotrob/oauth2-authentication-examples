'use strict';

const User = require('./user');

module.exports = {
  test_user: new User({
    id: 1,
    username: 'test_user',
    firstname: 'Test',
    surname: 'User',
  }),
};
