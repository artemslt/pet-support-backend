const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const newPass = async (req, res) => {
  const { resetToken, password } = req.body;
  const user = await User.findOne({ resetToken });
  if (!user) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  await User.findByIdAndUpdate(user._id, { password: hashPassword, token });
  const { name, email, location, birthday, phone, avatarURL } = user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: { name, email, birthday, location, phone, avatarURL },
      token,
    },
  });
};

module.exports = newPass;
