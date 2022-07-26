const mongoose = require('mongoose');
const Album = require('./album');

const genreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }
});

genreSchema.pre('remove', function(next) {
    Album.find( {genre: this.id}, (err, albums) => {
        if (err) {
            next(err)
        } else if (albums.length > 0) {
            next(new Error('This genre still has album items.'))
        } else {
            next()
        }
    })
});

module.exports = mongoose.model('Genre', genreSchema);