const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');

// All Artists
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({})
        res.render('artists/index', {artists, artists})
    } catch {
        res.redirect('/')
    }
})

// New Artist Route
router.get('/new', (req, res) => {
    res.render('artists/new', {artist: new Artist()})
})

// Posting New Artist to DB 
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name
    })
    try {
        const newArtist = await artist.save()
        res.redirect('/artists')
    } catch {
        res.render('artists/new', {
            artist: artist, 
            errorMessage: 'Error creating Artist.'
        })
    }
})

module.exports = router