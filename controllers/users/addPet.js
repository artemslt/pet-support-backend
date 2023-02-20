const cloudinary = require('cloudinary').v2;
const { Pet } = require('../../models/pet');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addPet = async (req, res) => {
  const petPhotoName = req.file.originalname;
  const updateAvatar = cloudinary.uploader.upload(req.file.path, {
    public_id: petPhotoName,
  });
  updateAvatar
    .then(data => {
      return data.secure_url;
    })
    .catch(err => {
      console.log(err);
    });
  const url = cloudinary.url(petPhotoName, {
    width: 100,
    height: 150,
    Crop: 'fill',
  });
  const { _id } = req.user;
  const result = await Pet.create({ ...req.body, photo: url, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

module.exports = addPet;
