const mongoose = require('mongoose');

const comShema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
})
module.exports  = mongoose.model('Comment', comShema);