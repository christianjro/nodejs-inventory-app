const mongoose = require('mongoose');
const Album = require('./album')

const artistSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }
});

artistSchema.pre('remove', function(next) {
    Album.find({artist: this.id}, (err, albums) => {
        if (err) {
            next(err);
        } else if (albums.length > 0) {
            console.error('This artist still has album items.');
            next(new Error('This artist still has album items.'));
        } else {
            next();
        };
    });
});

module.exports = mongoose.model('Artist', artistSchema);