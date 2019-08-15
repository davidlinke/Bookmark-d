const express = require('express');
const bookmarks = express.Router();
const Bookmark = require('../models/bookmarks.js');

//create route
bookmarks.post('/', (req, res) => {
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

//delete route
bookmarks.delete('/:id', (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id, (err, deletedBookmark) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedBookmark);
  });
});

//update route
bookmarks.put('/:id', (req, res) => {
  Bookmark.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBookmark) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedBookmark);
    }
  );
});

module.exports = bookmarks;
