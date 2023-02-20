const Notice = require("../../models/notice");
const { NotFound } = require('http-errors');

const getNoticeByKeyword = async (req, res) => {
  const { search: query } = req.params;

  const result = await Notice.find({ $text: { $search: query } });
  
  if (result.length === 0) {
    throw new NotFound("There is no notices by yiur query")
  }
  res.json({ result })
};

module.exports = getNoticeByKeyword;