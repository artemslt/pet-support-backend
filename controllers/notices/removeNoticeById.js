const Notice = require("../../models/notice");
const {NotFound} = require('http-errors')

const removeNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
  const notice = await Notice.findByIdAndRemove({ _id: noticeId, owner });

  if (!notice) {
    throw new NotFound("Notice does not exist");
  };

  res.json({ message: "Notice has been removed " });
};

module.exports = removeNoticeById;
