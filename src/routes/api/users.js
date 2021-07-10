const express = require('express');
const router = express.Router();

const upload = require('../../helpers/multer');
const {
  validateAuth,
  validateSubscription,
  validateEmailVerification,
} = require('../../middleware/validationUsers');
const authMiddleware = require('../../middleware/authMiddleware');

const {
  signup,
  login,
  logout,
  current,
  subscriptionStatus,
  avatars,
  verify,
  verification,
} = require('../../controllers/usersController');

router.get('/verify/:verificationToken', verify);
router.post('/verify/', validateEmailVerification, verification);
router.post('/signup', validateAuth, signup);
router.post('/login', validateAuth, login);
router.patch('/subscription', authMiddleware, validateSubscription, subscriptionStatus);
router.post('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, current);
router.patch('/avatars', authMiddleware, upload.single('avatar'), avatars);

module.exports = router;
