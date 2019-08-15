const express = require('express');
const bookmarks = express.Router();
const Bookmark = require('../models/bookmarks.js');

//create route
bookmarks.post('/', (req, res) => {
  console.log('posting!');
  Bookmark.create(req.body, (error, createdBookmark) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdBookmark);
  });
});

//index route
bookmarks.get('/', (req, res) => {
  Bookmark.find({}, (err, foundBookmark) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundBookmark);
  });
});

module.exports = bookmarks;
