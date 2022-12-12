const mongoose = require('mongoose');

const postShema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})
module.exports  = mongoose.model('Post', postShema);