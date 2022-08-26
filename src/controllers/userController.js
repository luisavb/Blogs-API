const userService = require('../services/userService');

const ERROR_500 = 'Something is wrong!';

const userCreate = async (req, res) => {
  const newUser = req.body;
  try {
    const result = await userService.createUser(newUser);
    if (!result) return res.status(409).json({ message: 'User already registered' });
    res.status(201).json({ token: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

module.exports = { userCreate, getAll };