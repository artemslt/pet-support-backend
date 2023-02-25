const cloudinary = require('cloudinary').v2;
const { Pet } = require('../../models/pet');
const fs = require('fs/promises');
require('dotenv').config();

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
  
  if (diff < 0 || diff > 9467280000000) {
    console.log('error')
  };

  console.log("success");

  console.log(birthday)
  console.log(res)
  // console.log(parsed)
  // console.log(today)
  // console.log(diff)
  // const bday = new Date('birthday');
  // const parsed = Date.parse(bday)
  // const string = birthday.toDateString()

  // console.log(bday)


  // const string = Number(today.toLocaleDateString());



  // console.log(string)



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
