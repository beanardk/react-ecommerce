const jwt = require('jsonwebtoken');

const secret = process.env.JWD_SECRET
const expiration = '2h';


module.exports.signToken = ({ email, _id }) => {
  const payload = { email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}