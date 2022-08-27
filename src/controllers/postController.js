const postService = require('../services/postService');

const ERROR_500 = 'Something is wrong!';

const postCreate = async (req, res) => {
  try {
    const newPost = req.body;
    const { email } = req;
    const result = await postService.createPost(email, newPost);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

module.exports = { postCreate };