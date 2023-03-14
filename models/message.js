const { model, Schema } = require('mongoose');

const MessageSchema = Schema(
  {
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    time: String,
    date: String,
  },
  { versionKey: false, timestamps: true }
);

const Message = model('message', MessageSchema);

module.exports = Message;
