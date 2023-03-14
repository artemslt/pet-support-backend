const mongoose = require('mongoose');
require('dotenv').config();

const http = require('./app');

const { PORT, DB_HOST } = process.env;

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
  })
  .then(() => {
    http.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
