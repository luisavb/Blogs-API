const { Category } = require('../database/models');

const createCategory = async (name) => {
  const categoryAlredyExist = await Category.findOne({ where: { name } });

  if (!categoryAlredyExist) {
    await Category.create({ name });
    const newCategory = await Category.findOne({ where: { name } });
    return newCategory;
  }
  
  return null;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = { createCategory, getAllCategories };