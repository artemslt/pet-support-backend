const bcryptjs = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models/user');

const register = async (req, res) => {
  const { name, email, password, location, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: `User with email ${email} already exists` });
  }
  // const verificationToken = uuidv4();
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    location,
    phone,
    // verificationToken,
  });

  //   const verificationEmail = {
  //     to: email,
  //     subject: 'Email verification',
  //     html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click here to verify</a>`,
  //   };
  //   await sendEmail(verificationEmail); ЗНАДОБИТЬСЯ ЗГОДОМ
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
