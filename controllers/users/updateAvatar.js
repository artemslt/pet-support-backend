const cloudinary = require('cloudinary').v2;
const { User } = require('../../models/user');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateAvatar = async (req, res) => {
  const avatarName = req.file.originalname;
  cloudinary.uploader.upload(req.file.path, {
    public_id: avatarName,
  });

  const url = cloudinary.url(avatarName, {
    width: 100,
    height: 150,
    Crop: 'fill',
  });
  const userId = req.user._id;
  await User.findByIdAndUpdate(userId, { avatarURL: url });
  res.status(200).json({
    status: 'success',
    code: 200,
  });
};

module.exports = updateAvatar;
