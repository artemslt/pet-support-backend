const Notice = require('../../models/notice');

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find({ category }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name email');

  if (result.length === 0 || !category) {
    return res
      .status(404)
      .json({ message: 'There is no notices in this category' });
  };

  const notices = [...result].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.json({
    status: 'success',
    code: 200,
    data: {
      notices,
    },
  });
};

module.exports = getNoticesByCategory;
