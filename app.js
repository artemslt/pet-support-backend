require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const newsRouter = require('./routes/api/news');
const friendsRouter = require('./routes/api/friends');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const noticesRouter = require('./routes/api/notices');
const redirectToDocs = require('./middleware/redirectToDocs');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/', redirectToDocs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/news', newsRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/notices', noticesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
