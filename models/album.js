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
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    }
});

// source of our image object
albumSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    };
});

module.exports = mongoose.model('Album', albumSchema);