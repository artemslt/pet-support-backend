const { User } = require("../../models/user");
const { NotFound } = require('http-errors');

const removeNoticeFromFavorites = async (req, res) => {
  const { id: owner } = req.user;
  const { noticeId } = req.params;
  const removeUserNotice = await User.findByIdAndUpdate(
    { _id: owner },
    { $pull: { favorite: noticeId } }
  );

  if (!noticeId) {
    throw new NotFound("Sorry, notice does not exist")
  }

  res.status(200).json({ message: "notice deleted" });
};

module.exports = removeNoticeFromFavorites;