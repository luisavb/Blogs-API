const loginService = require('../services/loginService');

const ERROR_500 = 'Something is wrong!';

const create = async () => {
  // try {
  //   const { username, password } = req.body;
  //   const result = await userService.create({ username, password });
  //   return res.status(201).json(result);
  // } catch (error) {
  //   return res.status(500).json({ message: ERROR_500 });
  // }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('controller -', email, password);
  try {
    const result = await loginService.login({ email, password });
    if (!result) return res.status(400).json({ message: 'Invalid fields' });
    res.status(200).json({ token: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

module.exports = { create, login };