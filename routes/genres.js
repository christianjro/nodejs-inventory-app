const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const Album = require('../models/album');

// All Genres
router.get('/', async (req, res) => {
    let query = Genre.find();
    if (req.query.name != null && req.query.name != ''){
        query = query.regex('name', new RegExp(req.query.name, 'i'));
    };

    try {
        const genres = await query.exec();
        res.render('genres/index', {genres: genres, searchOptions: req.query});
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
        const newGenre = await genre.save();
        res.redirect('/genres');
    } catch {
        res.render('genres/new', {
            genre: genre, 
            errorMessage: 'Error creating Genre'
        });
    }
});

// Genre Show Page
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.render('genres/show', {genre: genre});
    } catch {
        res.redirect('/');
    }
});

// Edit Genre Route
router.get('/:id/edit', async (req,res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.render('genres/edit', {genre: genre});
    } catch {
        res.redirect('/genres');
    } 
});

// Edit Genre on DB
router.put('/:id', async (req, res) => {
    let genre;
    try {
        genre = await Genre.findById(req.params.id);
        genre.name = req.body.name;
        await genre.save();
        res.redirect(`/genres/${genre.id}`);
    } catch {
        if (genre == null) {
            res.redirect('/');
        } else {
            res.render('genres/edit', {genre: genre, errorMessage: 'Error updating Genre'});
        };
    };
});

// Delete Genre on DB
router.delete('/:id', async(req, res) => {
    let genre;
    try {
        genre = await Genre.findById(req.params.id);
        await genre.remove();
        res.redirect('/genres');
    } catch {
        if (genre == null) {
            res.redirect('/');
        } else {
            res.redirect(`/genres/${genre.id}`);
        };
    };
});

module.exports = router;