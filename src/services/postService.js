const { User, BlogPost, PostCategory, sequelize } = require('../database/models');

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

// const getAllUsers = async () => {
//   const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
//   return allUsers;
// };

// const getUserById = async (id) => {
//   const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
//   if (!user) return null;
//   return user;
// };

module.exports = { createPost };