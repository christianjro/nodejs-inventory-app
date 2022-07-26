const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const Artist = require('../models/artist');

router.get('/', async (req, res) => {
    res.render('albums/index')
})

module.exports = router