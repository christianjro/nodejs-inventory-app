const express = require('express');
const router = express.Router();
const Album = require('../models/album');
const Artist = require('../models/artist');
const Genre = require('../models/genre');

// All Albums Route
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find({})
        res.render('albums/index', {albums: albums})
    } catch {
        res.redirect('/')
    }
})

// New Album Route
router.get('/new', async (req, res) => {
    try {
        const genres = await Genre.find({})
        const artists = await Artist.find({})
        res.render('albums/new', {artists: artists, genres: genres, album: new Album()})
    } catch {
        res.redirect('/albums')
    }
})

// Posting New Album to DB
router.post('/', async (req, res) => {
    const album = new Album({
        title: req.body.title, 
        artist: req.body.artist, 
        genre: req.body.genre,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
    })
    try {
        const newAlbum = await album.save()
        res.redirect('/albums')
        // res.redirect(`/albums/${newAlbum.id}`)
    } catch {
        // come back to this...
        res.render('albums/new', {
            album: album, 
            errorMessage: 'Error creating Album.'
        })
    }
})

module.exports = router