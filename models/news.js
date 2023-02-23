const { Schema, model } = require("mongoose");

const newSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  }
}, { versionKey: false, timestamps: true });

const New = model("new", newSchema);

module.exports = New;