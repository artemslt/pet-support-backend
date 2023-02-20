const Notice = require("../../models/notice");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addNewNotice = async (req, res) => {
  const { _id: owner } = req.user;

  const { path: upload } = req.file;
  const { url } = await cloudinary.uploader.upload(upload);
  const image = url;
  
  fs.unlink(upload);

  const newNotice = await Notice.create({...req.body, image, owner});
  res.json({ newNotice });
};

module.exports = addNewNotice;