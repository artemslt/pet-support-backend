const { User } = require("../../models/user");
// const { NotFound } = require('http-errors');

const removeNoticeFromFavorites = async (req, res, next) => {
  const { id: owner } = req.user;
  const { noticeId } = req.params;
  const removeUserNotice = await User.findByIdAndUpdate(
    { _id: owner },
    { $pull: { favorite: noticeId } }
  );

  if (!noticeId) {
    return res.status(404).json({ message: 'Sorry, notice does not exist or has been already removed' });
    // throw new NotFound("Sorry, notice does not exist")
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "notice deleted"
  });
};

module.exports = removeNoticeFromFavorites;