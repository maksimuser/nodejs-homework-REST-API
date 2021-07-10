const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');
const pathFile = path.join('public', 'avatars');

const {
  createUser,
  findByEmail,
  updateStatusSubscription,
  updateAvatar,
  verifyUser,
  verificationUser,
} = require('../services/usersService');
const { loginAuth, logoutAuth } = require('../services/authService');

const signup = async (req, res, next) => {
  const user = await findByEmail(req.body);
  if (user) {
    return res.status(409).json({
      message: 'Email in use',
    });
  }
  try {
    const newUser = await createUser(req.body);

    const { email, subscription, avatarURL } = newUser;

    return res.status(201).json({
      message: 'success',
      user: { email, subscription, avatarURL },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await loginAuth(req.body);

    if (!token) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const { email, subscription } = await findByEmail(req.body);

    return res.status(200).json({
      status: 'success',
      token,
      user: { email, subscription },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await logoutAuth(id);
    return res.status(204).json({});
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  return res.status(200).json({ currentUser: { email, subscription } });
};

const subscriptionStatus = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { subscription, email, id } = await updateStatusSubscription(userId, req.body);

    return res
      .status(200)
      .json({ message: 'success', user: { subscription, email, id } });
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  if (req.file) {
    const img = await jimp.read(req.file.path);
    await img
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(req.file.path);

    await fs.rename(req.file.path, path.join(pathFile, req.file.filename));
  }

  const localHost = req.headers.host;
  let avatarURL = req.user.avatarURL;
  const filePath = path.join(req.file.filename);
  const url = 'http://' + localHost + '/avatars/' + filePath;
  avatarURL = url;

  await updateAvatar(req.user.id, avatarURL);
  res.status(200).json({ avatarURL });
};

const verify = async (req, res, next) => {
  try {
    const result = await verifyUser(req.params);

    if (result) {
      return res.status(200).json({
        status: 'success',
        message: 'Verification successful',
      });
    } else {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const verification = async (req, res, next) => {
  try {
    const user = await verificationUser(req.body);
    if (user.verify) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }
    return res.status(200).json({ message: 'Verification email sent' });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  signup,
  login,
  logout,
  current,
  subscriptionStatus,
  avatars,
  verify,
  verification,
};
