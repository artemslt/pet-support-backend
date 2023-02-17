const Friend = require("../../models/friend");
const { NotFound } = require("http-errors");

const getAllFriends = async (req, res, next) => {
  const friends = await Friend.find();
  if (friends.length === 0) {
    throw NotFound("There is no friends in the list")
  }
  res.json(friends);
};

module.exports = getAllFriends;
