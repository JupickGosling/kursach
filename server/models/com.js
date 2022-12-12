const mongoose = require('mongoose');

const comShema = mongoose.Schema({
    name: {
        type: String,
        default: "Гость",
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})
module.exports  = mongoose.model('Comment', comShema);