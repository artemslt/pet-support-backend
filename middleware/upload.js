const multer = require("multer");
const path = require("path");
require('dotenv').config();

const tempDir = path.join(__dirname, "../", "temp")

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 500000 }
})

module.exports = upload;