const Notice = require("../../models/notice");
const {NotFound} = require('http-errors')

const removeNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  console.log(req.params)
    const notice = await Notice.findByIdAndRemove(noticeId)
    if (!notice) {
        throw new NotFound("Notice does not exist")
    }
  res.json({ message: "Notice has been removed " });
};

module.exports = removeNoticeById;