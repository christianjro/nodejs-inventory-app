const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const Album = require('../models/album');

// All Artists
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({});
        res.render('artists/index', {artists, artists});
    } catch {
        res.redirect('/');
    };
});

// New Artist Route
router.get('/new', (req, res) => {
    res.render('artists/new', {artist: new Artist()});
})

// Posting New Artist to DB 
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name
    });
    try {
        const newArtist = await artist.save();
        res.redirect('/artists');
    } catch {
        res.render('artists/new', {
            artist: artist, 
            errorMessage: 'Error creating Artist.'
        });
    };
});

// Show Artist Route
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        const albums = await Album.find({ artist: artist.id }).limit(6).exec();
        res.render('artists/show', { artist: artist, albumsByArtist: albums});
    } catch {
        res.redirect('/');
    };
});

// Edit Artist Route
router.get('/:id/edit', async (req,res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        res.render('artists/edit', {artist: artist});
    } catch {
        res.redirect('/artists');
    };
});

// Edit Artist on MongoDB
router.put('/:id', async (req, res) => {
    let artist;
    try {
        artist = await Artist.findById(req.params.id);
        artist.name = req.body.name;
        await artist.save();
        res.redirect(`/artists/${artist.id}`);
    } catch {
        if (artist == null) {
            res.redirect('/');
        } else {
            res.render('artists/edit', {
                artist: artist,
                errorMessage: 'Error updating Artist'
            });
        };
    };
});

// Delete Artist 
router.delete('/:id', async (req, res) => {
    let artist; 
    try {
        artist = await Artist.findById(req.params.id);
        await artist.remove();
        res.redirect('/artists');
    } catch {
        if (artist == null) {
            res.redirect('/');
        } else {
            res.redirect(`/artists/${artist.id}`)
        };
    };
});


module.exports = router;