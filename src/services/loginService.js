const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  console.log(user);

  if (!user) {
    return null;
  }

  const token = jwt.sign({ email: user.email },
    process.env.JWT_SECRET, { algorithm: 'HS256' });

  return token;
};

module.exports = { login };