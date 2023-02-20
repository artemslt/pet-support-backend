const { User } = require("../../models/user");
const { NotFound } = require("http-errors");
const { Conflict } = require("http-errors");
const Notice = require("../../models/notice");

const addNoticeToFavorites = async (req, res, next) => {
  const { noticeId } = req.params;
  const { id: userId } = req.user;
  const notice = await Notice.findById(noticeId)
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { favorite: noticeId } }
  );

  if (!notice) {
    throw NotFound("Sorry, there is no ad");
  };

  if (result.favorite.includes(noticeId)) {
    throw new Conflict("sorry, you already added notice to the list of favorites");
  };

  res.json({
    message: "Notice has been successfully added",
    data: { result }
  });
};

module.exports = addNoticeToFavorites;
