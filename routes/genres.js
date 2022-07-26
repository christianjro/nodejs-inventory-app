const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const Album = require('../models/album');

// All Genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.render('genres/index', {genres: genres});
    } catch {
        res.redirect('/');
    }
});

// New Genre Route
router.get('/new', (req, res) => {
    res.render('genres/new', {genre: new Genre()});
});

// Posting Genre to DB
router.post('/', async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    });
    try {
        const newGenre = await genre.save()
        res.redirect('/genres')
    } catch {
        res.render('authors/new', {
            genre: genre, 
            errorMessage: 'Error creating Genre'
        })
    }
});

module.exports = router;