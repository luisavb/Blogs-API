const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const dados = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log('amigo estou aqui no auth---', dados);
    req.email = dados.email;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { auth };