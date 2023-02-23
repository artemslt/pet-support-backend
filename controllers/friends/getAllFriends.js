const Friend = require("../../models/friend");
// const { NotFound } = require("http-errors");

const getAllFriends = async (req, res, next) => {
  const friends = await Friend.find();
  if (friends.length === 0) {
    // throw NotFound("There is no friends in the list");
    return res.status(404).json({ message: 'There is no friends in the list' });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      friends,
    }
  });
};

module.exports = getAllFriends;
