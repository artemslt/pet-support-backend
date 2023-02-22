const { User } = require("../../models/user");
const { NotFound } = require("http-errors");
const Notice = require("../../models/notice");
const { Conflict } = require('http-errors');

const addNoticeToFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { id: userId } = req.user;
  const notice = await Notice.findById(noticeId)
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { favorite: noticeId } }
  );

  if (!notice) {
    throw NotFound("Sorry, there is no ad");
  }

  if (result.favorite.includes(noticeId)) {
    throw new Conflict("This notice has been already added to the list of favorites");
  };

  res.json({
    status: "success",
    code: 200,
    message: "Notice has been successfully added to the list of favorites",
    data: {
      result
    }
  });
};

module.exports = addNoticeToFavorites;
