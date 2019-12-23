const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema({
    trackNumber: {
        type: String,
        required:true,
        unique:true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports =  Track = mongoose.model('track', trackSchema);