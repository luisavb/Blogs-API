const { User, BlogPost, PostCategory, Category, sequelize } = require('../database/models');

const createPost = async (email, newPost) => {
  const { title, content, categoryIds } = newPost;
  const findUser = await User.findOne({ where: { email } });
  
  const { id } = findUser;
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

// const getUserById = async (id) => {
//   const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
//   if (!user) return null;
//   return user;
// };

module.exports = { createPost, getAll };