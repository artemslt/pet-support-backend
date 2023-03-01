const { User } = require('../../models/user');

const getFavoriteNotices = async (req, res, next) => {
  const { id: userId } = req.user;

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const currentUser = await User.findOne({ _id: userId }, '', {
    skip,
    limit: Number(limit),
  }).populate('favorite');

  const result = currentUser.favorite;

  if (result.length === 0) {
    return res
      .status(404)
      .json({ message: 'Sorry, you do not have favorite notices' });
  }

  const notices = [...result].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.json({
    status: 'success',
    code: 200,
    data: {
      notices,
    },
  });
};

module.exports = getFavoriteNotices;
