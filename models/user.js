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
      default: 'New user',
    },
    location: {
      type: String,
      default: 'City, Region',
    },
    phone: {
      type: String,
      default: '+380000000000',
    },
    birthday: {
      type: String,
      default: '00.00.0000',
    },
    token: {
      type: String,
      default: null,
    },
    favorite: [
      {
        type: Schema.ObjectId,
        ref: 'notice',
      },
    ],
    avatarURL: { type: String, default: null },
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

const emailRegexp =
  /^([a-zA-Z0-9_.]+){1}([a-zA-Z0-9_\-.]+){1}@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,3})$/;
const passwordRegexp = /^\S*$/;
const nameRegexp = /^([a-zA-Zа-яА-ЯёЁ\s]+)$/;
const phoneRegexp = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
const locationRegexp =
  /^(?:(?:\w+-\w+)+|(?:\w+)+),\s(?:(?:\w+-\w+)+|(?:\w+)+)$/;

const joiRegisterSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(emailRegexp, 'Email must be in format mail@mail.com')
    .min(6)
    .max(63)
    .required('Email must be in format mail@mail.com'),
  password: Joi.string()
    .pattern(passwordRegexp, 'Whitespace is not allowed')
    .min(7)
    .max(32)
    .required('Password is required'),
  name: Joi.string().pattern(nameRegexp, 'Name must contain only letters'),
  location: Joi.string().pattern(
    locationRegexp,
    'Location must be in format City, Region'
  ),
  phone: Joi.string()
    .max(13)
    .pattern(phoneRegexp, 'Mobile phone must be in format +380xxxxxxxxx'),
});
const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(emailRegexp, 'Email must be in format mail@mail.com')
    .min(10)
    .max(63)
    .required('Email must be in format mail@mail.com'),
  password: Joi.string()
    .pattern(passwordRegexp, 'Whitespace is not allowed')
    .min(7)
    .max(32)
    .required('Password is required'),
});
const joiGoogleLoginSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp, 'Name must contain only letters'),
  email: Joi.string()
    .email()
    .pattern(emailRegexp, 'Email must be in format mail@mail.com')
    .min(10)
    .max(63)
    .required('Email is required'),
});

const User = model('user', userSchema);
module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiGoogleLoginSchema,
};
