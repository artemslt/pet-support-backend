const { Schema, model } = require('mongoose');
const Joi = require('joi');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter name of your pet'],
    },
    birthday: {
      type: String,
      required: [true, 'Type birthday date'],
    },
    breed: {
      type: String,
      required: [true, 'Select breed'],
    },
    photo: {
      type: String,
      required: [false, 'I dont believe that you have no photos of your pet'],
    },
    comment: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  birthday: Joi.string().required(),
  breed: Joi.string().required(),
  photo: Joi.string(),
  comment: Joi.string(),
});

const Pet = model('pet', petSchema);
module.exports = { Pet, joiSchema };
