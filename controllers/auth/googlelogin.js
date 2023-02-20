const { User } = require('../../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const googleLogin = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user) {
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    const result = await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  }
  const { name } = user;
  const password = await bcryptjs.hash(Date.now(), 10);
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = googleLogin;
