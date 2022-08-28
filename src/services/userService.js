const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const createUser = async (newUser) => {
  const { displayName, email, password, image } = newUser;
  const userAlredyExist = await User.findOne({ where: { email } });

  if (!userAlredyExist) {
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email },
    process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '6d' });

    return token;
  }
  
  return null;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return null;
  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return {};
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };