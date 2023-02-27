const { User } = require("../../models/user");
const Notice = require("../../models/notice");

const addNoticeToFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { id: userId } = req.user;
  const notice = await Notice.findById(noticeId)
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { favorite: noticeId } }
  );

  if (!notice) {
    return res.status(404).json({ message: 'Sorry, notice does not exist or has been already removed' });
  };

  if (result.favorite.includes(noticeId)) {
    return res.status(409).json({ message: 'This notice has been already added to the list of favorites' });
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
