const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Artist'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Genre'
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    numberInStock: {
        type: Number, 
        required: true
    },
    coverImage: {
        type: Buffer, 
        required: false
    }
});

module.exports = mongoose.model('Album', albumSchema);