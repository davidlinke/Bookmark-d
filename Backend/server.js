const express = require('express');
const app = express();
const PORT = 3001;
const bookmarksController = require('./controllers/bookmarks');
const mongoose = require('mongoose');

//middleware
app.use(express.json());
app.use('/bookmarks', bookmarksController);

// Error / Disconnection
mongoose.connection.on('error', err =>
  console.log(err.message + ' is Mongod not running?')
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect('mongodb://localhost:27017/holidays', {
  useNewUrlParser: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
});

app.listen(PORT, () => {});
