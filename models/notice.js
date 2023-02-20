const { Schema, model } = require("mongoose");

const newSchema = Schema({
  category: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
    required: true
  },
  title: {
    type: String,
    required: true,
    text: true
  },
  name: {
    type: String
  },
  date: {
    type: Date
  },
  breed: {
    type: String
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0.1
  },
  image: {
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {versionKey: false, timestamps: true});

const Notice = model("notice", newSchema);

module.exports = Notice;