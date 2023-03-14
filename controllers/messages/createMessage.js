const Message = require("../../models/message");

const createMessage = async (message) => {
   try {
    return await Message.create(message);
   } catch (error) {
    console.log(error)
   }
  };

  module.exports = createMessage;