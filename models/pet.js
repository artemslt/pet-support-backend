const { Schema, model } = require('mongoose');
const Joi = require('joi');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: String,
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
    },
    photo: {
      type: String,
      required: [true, 'Photo is required'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const nameRegexp = /^([a-zA-Zа-яА-ЯІіЇїЄє\s]+)$/;
const birthdayRegexp = /^(\d{1,2})\.(\d{1,2})(?:\.(\d{4}))?$/;

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp, 'Name must contain only letters')
    .min(2, 'Name must be 2 characters minimum')
    .max(16, 'Name must be 16 characters maximum')
    .required('Name is required'),
  birthday: Joi.string()
    .pattern(birthdayRegexp, 'Birthday must be in format 19.12.2020')
    .required('Birthday is required'),
  breed: Joi.string()
    .pattern(nameRegexp, 'Breed must contain only letters')
    .min(3, 'Breed must be 3 characters minimum')
    .max(40, 'Breed must be 40 characters maximum')
    .required('Breed is required'),
  photo: Joi.string().required('Photo is required'),
  comment: Joi.string()
    .min(8, 'Comment must be 8 characters minimum')
    .max(120, 'Comment must be 120 characters maximum')
    .required('Comment is required'),
});

const Pet = model('pet', petSchema);
module.exports = { Pet, joiSchema };
