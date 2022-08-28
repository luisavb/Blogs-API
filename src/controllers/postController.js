const postService = require('../services/postService');

const ERROR_500 = 'Something is wrong!';

const postCreate = async (req, res) => {
  try {
    const newPost = req.body;
    const { id } = req;
    const result = await postService.createPost(id, newPost);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const getAllPost = async (_req, res) => {
  try {
    const result = await postService.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const getByIdPost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.getById(id);
    if (!result) return res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updtPost = req.body;
    const result = await postService.update(id, updtPost);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postService.deletePost(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 }); 
  }
};

module.exports = { postCreate, getAllPost, getByIdPost, updatePost, deletePost };