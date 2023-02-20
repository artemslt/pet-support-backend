const Notice = require("../../models/notice");
const { NotFound } = require('http-errors');

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);

  if (!notice) {
    throw new NotFound("Notice does not exist")
  }
  res.json({ notice });
};

module.exports = getNoticeById;