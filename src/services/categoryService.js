// const jwt = require('jsonwebtoken');
const { Category } = require('../database/models');
// require('dotenv').config();

const createCategory = async (name) => {
  const categoryAlredyExist = await Category.findOne({ where: { name } });

  if (!categoryAlredyExist) {
    await Category.create({ name });
    const newCategory = await Category.findOne({ where: { name } });
    return newCategory;
  }
  
  return null;
};

// const getAllUsers = async () => {
//   const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
//   return allUsers;
// };

// const getUserById = async (id) => {
//   const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
//   if (!user) return null;
//   return user;
// };

module.exports = { createCategory };