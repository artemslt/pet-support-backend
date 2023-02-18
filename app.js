require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const newsRouter = require('./routes/api/news');
const friendsRouter = require('./routes/api/friends');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const noticesRouter = require("./routes/api/notices");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/news', newsRouter);
app.use('/api/friends', friendsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
