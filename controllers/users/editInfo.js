const { User } = require('../../models/user');

const editInfo = async (req, res) => {
  const userId = req.user._id;
  const result = await User.findByIdAndUpdate(userId, req.body);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

module.exports = editInfo;
