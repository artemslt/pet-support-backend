const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { sendEmail } = require('../../helpers/sendEmail');

const { SECRET_KEY } = process.env;

const resetPass = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: `There is no user with email ${email}` });
  }
  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  const linkMessage = {
    to: email,
    subject: 'Reseting your password',
    html: `
    <h2>Please click on the link below to reset your password</h2>
    <a href="https://artemslt.github.io/pet-support-app/resetpassword/${token}">Click here!</a>`,
  };
  await sendEmail(linkMessage);
  await User.findByIdAndUpdate(user._id, { resetToken: token });
  res.json({ message: 'User updated, email sent' });
};

module.exports = resetPass;
