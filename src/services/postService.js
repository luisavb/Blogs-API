const { User, BlogPost, PostCategory, Category, sequelize } = require('../database/models');

const createPost = async (id, newPost) => {
  const { title, content, categoryIds } = newPost;
  // const findUser = await User.findOne({ where: { email } });
  
  // const { id } = findUser;
  const transactionS = await sequelize.transaction(async (t) => {
   const { dataValues } = await BlogPost.create({ title, content, userId: id }, { transaction: t });
   const categories = categoryIds.map((category) => ({
    postId: dataValues.id,
    categoryId: category,
   }));
   await PostCategory.bulkCreate(categories, { transaction: t });
   return dataValues;
  });

  console.log('o que temos nesse postService ---', transactionS);
  return transactionS;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return allPosts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  // const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!post) return null;
  return post;
};

const update = async (postId, updtPost) => {
  const { title, content } = updtPost;
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const result = getById(postId);

  return result;
};

const deletePost = async (postId) => {
  await BlogPost.destroy({ where: { id: postId } });

  return {};
};

module.exports = { createPost, getAll, getById, update, deletePost };