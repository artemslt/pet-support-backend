const { User } = require('../../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const googleLogin = async (req, res) => {
  const { email, name } = req.body;
  const registeredUser = await User.findOne({ email });
  if (registeredUser) {
    const payload = {
      id: registeredUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    const user = await User.findByIdAndUpdate(registeredUser._id, { token });
    const { location, birthday, phone, avatarURL } = user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: { name, email, birthday, location, phone, avatarURL },
        token,
      },
    });
  }
  const password = await bcryptjs.hash(Date.now().toString(), 10);
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  const { location, birthday, phone, avatarURL } = user;
  await User.findByIdAndUpdate(user._id, {
    token,
  });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: { name, email, location, birthday, phone, avatarURL },
      token,
    },
  });
};

module.exports = googleLogin;
