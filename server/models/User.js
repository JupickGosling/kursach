const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userShema);