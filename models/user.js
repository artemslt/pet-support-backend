const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlenght: 6,
    },
    name: {
      type: String,
      required: [true, 'Enter your name'],
    },
    location: {
      type: String,
      required: [true, 'Choose your city'],
    },
    phone: {
      type: String,
      required: [true, 'Enter your phone number'],
    },
    birthday: {
      type: String,
      default: '00.00.0000',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },
  },

  { versionKey: false }
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  phone: Joi.string().required(),
});
const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const User = model('user', userSchema);
module.exports = { User, joiRegisterSchema, joiLoginSchema };
