const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { SECRET_KEY } = process.env;

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
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  const { name, location, birthday, phone, avatarURL } = user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: { name, email, birthday, location, phone, avatarURL },
      token,
    },
  });
};

module.exports = login;
