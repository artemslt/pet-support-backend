const Notice = require('../../models/notice');

const getNoticesByUser = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find({ owner }, '', {
    skip,
    limit: Number(limit),
  });

  if (result.length === 0) {
    return res.status(404).json({ message: 'You do not have any notices' });
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getNoticesByUser;
