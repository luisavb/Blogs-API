const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(authorization, process.env.JWT_SECRET);
    console.log('amigo estou aqui');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { auth };