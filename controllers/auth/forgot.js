const { User } = require('../../models/user');
const { Unauthorized } = require('http-errors');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY, SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

const forgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`There is no user with email ${email}`);
  }
  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  const data = {
    from: 'dante120591@gmail.com',
    to: email,
    subject: 'Reseting your password',
    html: `
    <h2>Please click on the link below to reset your password</h2>
    <p>http://localhost:3000/auth/forgot/${token}</p>`,
  };
  await User.updateOne({ resetLink: token }, function (error, success) {
    if (error) {
      return res.status(400).json({ error: 'Reset password link error' });
    } else {
      sgMail.send(data, function (_, body) {
        return res.json({ message: 'Email with reset link sent' });
      });
    }
  });
};

module.exports = forgot;
