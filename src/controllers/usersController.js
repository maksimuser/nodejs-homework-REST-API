const {
  createUser,
  findByEmail,
  updateStatusSubscription,
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
    const { email, subscription } = newUser;
    return res.status(201).json({
      message: 'success',
      user: { email, subscription },
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
    const { subscription, email, id } = await updateStatusSubscription(
      userId,
      req.body,
    );

    return res
      .status(200)
      .json({ message: 'success', user: { subscription, email, id } });
  } catch (e) {
    next(e);
  }
};
module.exports = { signup, login, logout, current, subscriptionStatus };
