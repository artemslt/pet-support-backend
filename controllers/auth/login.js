const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'Incorrect email or password' });
  }
  const passCompare = bcryptjs.compareSync(password, user.password);
  if (!passCompare) {
    res.status(400).json({ message: 'Incorrect email or password' });
  }
  const payload = {
    id: user._id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: '5m',
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  const { name, location, phone } = user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: { name, email, location, phone },
      accessToken,
      refreshToken,
    },
  });
};

module.exports = login;
