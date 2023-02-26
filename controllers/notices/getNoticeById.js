const Notice = require("../../models/notice");
// const { NotFound } = require('http-errors');

const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId).populate("owner", "_id name email phone");

  if (!notice) {
    // throw new NotFound("Notice does not exist");
    return res.status(404).json({ message: 'Notice does not exist' });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      notice
    }
  });
};

module.exports = getNoticeById;