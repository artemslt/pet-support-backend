const multer = require('multer');
const path = require('path');
const { UnsupportedMediaType } = require('http-errors');
require('dotenv').config();

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(
      null,
      false,
      new UnsupportedMediaType(
        'Unsupported file format. File should have png, jpeg or jpg formats'
      )
    );
  }
};

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 5242880 },
  fileFilter,
});

module.exports = upload;
