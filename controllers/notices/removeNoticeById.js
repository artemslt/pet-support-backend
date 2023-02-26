const Notice = require("../../models/notice");
// const {NotFound} = require('http-errors')

const removeNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
  const notice = await Notice.findByIdAndRemove({ _id: noticeId, owner });

  if (!notice) {
    return res.status(404).json({ message: 'Notice does not exist or has been already removed' });
  };

  res.json({
    status: "success",
    code: 200,
    message: "Notice has been removed "
  });
};

module.exports = removeNoticeById;
