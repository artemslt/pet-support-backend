const { Schema, model } = require("mongoose");

const newSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  addressUrl: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  workdays: {
    type: Schema.Types.Array
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
}, { versionKey: false, timestamps: true });

const Friend = model("friend", newSchema);

module.exports = Friend;