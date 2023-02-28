const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
require('dotenv').config();
const { Pet } = require('../../models/pet');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addPet = async (req, res) => {
  let { birthday } = req.body;
  birthday = new Date(birthday.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
  const parsed = Date.parse(birthday);
  const today = Date.now();
  const diff = today - parsed;

  if (diff < 0 || diff > 9467280000000 || isNaN(parsed)) {
    return res.status(400).json({
      message:
        'The date must be no more than 300 years in the past, or later than today, and be in the format dd.mm.yyyy',
    });
  }

  const { path: upload } = req.file;
  const { url } = await cloudinary.uploader.upload(upload, {
    width: 182,
    height: 182,
    crop: 'fill',
  });

  fs.unlink(upload);

  const { _id } = req.user;
  const result = await Pet.create({ ...req.body, photo: url, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

module.exports = addPet;
