const mongoose = require('mongoose');
const { Schema } = mongoose;
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
  },
  { versionKey: false },
);

// хешируем пароль
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return null;
  }
  this.password = await bcrypt.hash(this.password, 6);
  next();
});

// сравниваем пароли
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
