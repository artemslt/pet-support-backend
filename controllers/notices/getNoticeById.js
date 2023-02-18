const Notice = require("../../models/notice");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  console.log(req.params)
  const notice = await Notice.findById(noticeId);
  console.log(notice)
  res.json({ notice });
};

module.exports = getNoticeById;