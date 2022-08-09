var express = require('express');
var router = express.Router();
var Album = require('../models/album');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let albums;
  try {
    albums = await Album.find().limit(10).populate('artist').exec()
  } catch {
    albums = []
  };
  res.render('index', {albums: albums});
});

module.exports = router;
