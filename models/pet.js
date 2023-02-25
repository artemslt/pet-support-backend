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

const nameRegexp = /^([a-zA-Zа-яА-ЯёЁёЁЇїІіҐґЄє\s]+)$/;
const birthdayRegexp = /^(\d{1,2})\.(\d{1,2})(?:\.(\d{4}))?$/;

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp, 'Name must contain only letters')
    .min(2)
    .max(16)
    .required('Name is required'),
  birthday: Joi.string()
    .pattern(birthdayRegexp, 'Birthday must be in format 19.12.2020')
    .required('Birthday is required'),
  breed: Joi.string()
    .pattern(nameRegexp, 'Breed must contain only letters')
    .min(3)
    .max(40)
    .required('Breed is required'),
  comment: Joi.string().min(8).max(120).required('Comment is required'),
});

const Pet = model('pet', petSchema);
module.exports = { Pet, joiSchema };
