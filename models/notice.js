const { Schema, model } = require("mongoose");

const newSchema = Schema({
  category: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
    required: true
  },
  title: {
    type: String,
    required: [true, "Please, add the title to the notice"],
    minLength: 2,
    maxLength: 48,
    text: true
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 16
  },
  date: {
    type: Date
  },
  breed: {
    type: String,
    minLength: 2,
    maxLength: 40
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Please, select a sex of your pet"]
  },
  location: {
    type: String,
    required: [true, "Please, select a location"]
  },
  price: {
    type: Number,
    min: 1
  },
  image: {
    type: String,
    required: [true, "Please, add an image to your notice"]
  },
  comments: {
    type: String,
    required: [true, "Please, add some comments to your notice"],
    minLength: 8,
    maxLength: 120
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {versionKey: false, timestamps: true});

const Notice = model("notice", newSchema);

module.exports = Notice;