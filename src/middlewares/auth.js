const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../database/models');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const { email } = jwt.verify(authorization, process.env.JWT_SECRET);
    
    const findUser = await User.findOne({ where: { email } });
    const { id } = findUser;

    console.log('amigo estou aqui no auth---', findUser);

    req.id = id;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { auth };