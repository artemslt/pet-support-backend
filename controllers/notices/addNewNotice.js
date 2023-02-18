const Notice = require("../../models/notice");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const addNewNotice = async (req, res) => {
  const { path: upload } = req.file;
  const { url } = await cloudinary.uploader.upload(upload)
  const image = url;
  
  fs.unlink(upload);

  const newNotice = await Notice.create({...req.body, image});
  res.json(newNotice)
};

module.exports = addNewNotice;

// тільки авторизовані користувачі
// оновити схему для додавання оголошень на продаж
