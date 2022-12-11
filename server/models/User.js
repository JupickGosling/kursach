const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    login: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type: String,
        default: "Пользователь"
    },
    created: {
        type: Date,
        default: Date.now
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

module.exports = mongoose.model('User', userShema);