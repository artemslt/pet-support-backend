const cloudinary = require('cloudinary').v2;
const { User } = require('../../models/user');
const fs = require('fs/promises');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateAvatar = async (req, res) => {
  const { path: upload } = req.file;
  const { url } = await cloudinary.uploader.upload(upload, {
    transformation: [
      {
        width: 233,
        height: 233,
        gravity: 'face',
        crop: 'fill',
      },
    ],
  });
  const image = url;

  fs.unlink(upload);

  const user = req.user._id;
  await User.findByIdAndUpdate(user, {
    avatarURL: image,
  });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      avatarURL: image,
    },
  });
};

module.exports = updateAvatar;
