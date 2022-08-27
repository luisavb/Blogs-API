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

const getAll = async (req, res) => {
  try {
    const { email } = req;
    console.log('oi eu sou um teste no usercontoler - ', email);
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserById(id);
    if (!result) return res.status(404).json({ message: 'User does not exist' }); 
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

module.exports = { userCreate, getAll, getById };