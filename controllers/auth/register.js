const bcryptjs = require('bcryptjs');

const { User } = require('../../models/user');

const register = async (req, res) => {
  const { name, email, password, location, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: `User with email ${email} already exists` });
  }
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    location,
    phone,
  });

  const { _id } = result;
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      _id,
      name,
      email,
    },
  });
};

module.exports = register;
