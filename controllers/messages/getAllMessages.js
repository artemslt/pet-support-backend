const Message = require('../../models/message');

const getAllMessages = async () => {
  try {
    const data = await Message.find().sort({createdAt: -1}).limit(100).populate('author', 'name');
    return data.reverse();
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllMessages;
