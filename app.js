const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const createMessage = require('./controllers/messages/createMessage');
const getAllMessages = require('./controllers/messages/getAllMessages');

const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http, {
  cors: 'https://artemslt.github.io/pet-support-app/',
});

const onlineUsers = new Map();

socket.on('connection', async user => {
  user.emit('changeOnline', onlineUsers.size);
  user.on('addUser', async data => {
    onlineUsers.set(data.id);
    user.emit('changeOnline', onlineUsers.size);
    user.broadcast.emit('changeOnline', onlineUsers.size);
    user.emit('allMessages', await getAllMessages());
  });

  user.on('typing', data => user.broadcast.emit('typingResponse', data));
  user.on('newMessage', message => {
    createMessage(message);
    user.broadcast.emit('showMessage', message);
  });
  user.on('disconnect', () => {
    console.log('disconnected')
    user.disconnect();
  });
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const newsRouter = require('./routes/api/news');
const friendsRouter = require('./routes/api/friends');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const noticesRouter = require('./routes/api/notices');
const petsRouter = require('./routes/api/pets');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/pets', petsRouter);
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

module.exports = http;
