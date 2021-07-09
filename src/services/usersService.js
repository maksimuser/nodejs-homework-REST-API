// создание и поиск user

const { nanoid } = require('nanoid');
const { User } = require('../schema');
const sendEmail = require('./emailService');

const createUser = async body => {
  const verifyToken = nanoid(7);
  const { email } = body;

  // отправляем email
  try {
    await sendEmail(verifyToken, email);
  } catch (e) {
    throw e.message;
  }

  const user = await User({ ...body, verifyToken });
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

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

const verifyUser = async ({ verificationToken }) => {
  const user = await User.findOne({ verifyToken: verificationToken });

  if (!user) {
    return false;
  }
  await user.updateOne({ verify: true, verifyToken: null });
  return true;
};

module.exports = {
  createUser,
  findByEmail,
  updateToken,
  findById,
  updateStatusSubscription,
  updateAvatar,
  verifyUser,
};
