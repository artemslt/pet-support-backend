const { User } = require("../../models/user");
const {NotFound} = require('http-errors')

const getFavoriteNotices = async (req, res, next) => {
  const { id: userId } = req.user;

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const currentUser = await User.findOne({ _id: userId }, "", {skip, limit: Number(limit)}).populate("favorite");

  const result = currentUser.favorite;

  if (result.length === 0) {
    throw new NotFound("Sorry, you do not have favorite notices")
  }

  res.json(result)
}

module.exports = getFavoriteNotices;
