const jwt = require('jsonwebtoken');

const secret = 'gfh$!dfC3446GhuT&';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, _id }) {
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};