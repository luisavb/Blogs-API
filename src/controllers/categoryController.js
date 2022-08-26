const categoryService = require('../services/categoryService');

const ERROR_500 = 'Something is wrong!';

const categoryCreate = async (req, res) => {
  try {
    const { name } = req.body;
    console.log('controller de category', name);
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const result = await categoryService.createCategory(name);
    if (!result) return res.status(409).json({ message: 'category already registered' });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

module.exports = { categoryCreate, getAll };