const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SG_API_KEY, SG_EMAIL_ADRESS } = process.env;

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: SG_EMAIL_ADRESS };
  try {
    await sgMail.send(email);
    console.log('email sent');
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
