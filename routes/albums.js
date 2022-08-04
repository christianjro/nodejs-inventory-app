const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Album = require('../models/album');
const Artist = require('../models/artist');
const Genre = require('../models/genre');

// All Albums Route
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find({});
        res.render('albums/index', {albums: albums});
    } catch {
        res.redirect('/');
    };
});

// New Album Route
router.get('/new', async (req, res) => {
    try {
        const genres = await Genre.find({});
        const artists = await Artist.find({});
        res.render('albums/new', {artists: artists, genres: genres, album: new Album()});
    } catch {
        res.redirect('/albums');
    };
});

// Posting New Album to DB
router.post('/', async (req, res) => {
    const album = new Album({
        title: req.body.title, 
        artist: req.body.artist, 
        genre: req.body.genre,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
    });
    try {
        const newAlbum = await album.save();
        res.redirect(`/albums/${newAlbum.id}`)
    } catch {
        // come back to this...
        res.render('albums/new', {
            album: album, 
            errorMessage: 'Error creating Album.'
        });
    };
});

// View Album Route
router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('genre').populate('artist').exec();
        res.render('albums/show', { album: album });
    } catch {
        res.redirect('/');
    };
});

// Edit Album Route
router.get('/:id/edit', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        const artists = await Artist.find({});
        const genres = await Genre.find({});
        res.render('albums/edit', { album: album, artists: artists, genres: genres });
    } catch {
        res.redirect('/albums');
    };
});

// Edit Album on MongoDB
router.put('/:id', async (req, res) => {
    let album;
    try {
        album = await Album.findById(req.params.id);

        album.title = req.body.title;
        album.artist = req.body.artist;
        album.genre = req.body.genre;
        album.description = req.body.description;
        album.price = req.body.price;
        album.numberInStock = req.body.numberInStock;

        await album.save();
        res.redirect(`/albums/${album.id}`);
    } catch {
        if (album != null) {
            res.redirect('/albums/edit', {
                album: album, 
                errorMessage: "Error updating Album."
            });
        } else {
            res.redirect('/');
        };
    };
});

// Delete Album
router.delete('/:id', async (req, res) => {
    let album
    try {
        album = await Album.findById(req.params.id);
        await album.remove()
        res.redirect('/albums')
    } catch {
        if (album != null) {
            res.render('albums/show', {
                album: album,
                errorMessage: 'Could not delete album.'
            });
        } else {
            res.redirect('/');
        };
    };
});

module.exports = router;