const { User } = require('../../models/user');

const editInfo = async (req, res) => {
  const user = req.user;
  await User.findByIdAndUpdate(user._id, req.body);
  const update = req.body;
  res.status(200).json({
    status: 'success',
    code: 200,
    data: update,
  });
};

module.exports = editInfo;
