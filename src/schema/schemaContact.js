const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
