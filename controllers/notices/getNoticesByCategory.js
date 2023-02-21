const Notice = require("../../models/notice");
const { NotFound } = require('http-errors');

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find({ category }, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");

  if (result.length === 0) {
    throw NotFound("There is no notices in this category");
  };

  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = getNoticesByCategory;