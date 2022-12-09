const mongoose = require('mongoose');

const comShema = mongoose.Schema({
    name: {
        type: String,
        default: "User",
    },
    page_id: {
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})
module.exports  = mongoose.model('comment', comShema);