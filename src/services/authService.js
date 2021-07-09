// отвечает за аутентификацию пользователя (login, logout),
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { updateToken, findByEmail } = require('./usersService');

const SECRET_WORD = process.env.JWT_SECRET_KEY;

const loginAuth = async ({ email, password }) => {
  const user = await findByEmail({ email });
  const validatedPassword = await user?.validatePassword(password);

  if (!user || !validatedPassword || !user.verify) {
    return null;
  }

  const id = user.id;
  const payload = { id };

  const token = jwt.sign(payload, SECRET_WORD, { expiresIn: '1h' });

  // обновляем токен
  await updateToken(id, token);

  return token;
};

const logoutAuth = async id => {
  return await updateToken(id, null);
};

module.exports = {
  loginAuth,
  logoutAuth,
};
