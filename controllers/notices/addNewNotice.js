const Notice = require("../../models/notice");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addNewNotice = async (req, res) => {
  let { date } = req.body;
  date = new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
  const parsedDate = Date.parse(date);
  const today = Date.now(); 
  const diff = today - parsedDate;

  if (diff < 0 || diff > 9467280000000 || isNaN(parsedDate)) {
    return res.status(400).json({ message: 'The date must be no more than 300 years in the past, or later than today, and be in the format dd.mm.yyyy' })
  };

  const { _id: owner } = req.user;

  const { path: upload } = req.file;
  const { url } = await cloudinary.uploader.upload(upload, {
    transformation: [{
      width: 288,
      height: 288,
      gravity: "face",
      crop: "fill"
    }]
  });
  const image = url;
  
  fs.unlink(upload);

  const newNotice = await Notice.create({ ...req.body, image, owner });
  
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Notice has been successfully added",
    data: {
      newNotice
    }
  });
};

module.exports = addNewNotice;