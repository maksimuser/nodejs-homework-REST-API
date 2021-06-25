// создание и поиск user
const { User } = require('../schema');

const createUser = async body => {
  const user = User(body);
  return await user.save();
};

const findByEmail = async ({ email }) => {
  return await User.findOne({ email });
};

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

const findById = async id => {
  return await User.findById(id);
};

const updateStatusSubscription = async (userId, body) => {
  return await User.findByIdAndUpdate(userId, { ...body }, { new: true });
};

module.exports = {
  createUser,
  findByEmail,
  updateToken,
  findById,
  updateStatusSubscription,
};
