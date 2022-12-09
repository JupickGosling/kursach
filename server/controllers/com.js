const Comment = require('../models/com');
const fs = require('fs');

module.exports = class COM {
    static async fetchPostByIDForComment(req, res){
        const id = req.params.id;
        try {
            const comment = await Comment.findById(id);
            res.status(200).json(comment);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }
    static async createComment(req, res){
        const comment = req.body;
        try {
            await Comment.create(comment);
            res.status(201).json({message: 'Comment created!'});
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    static async fetchAllComment(req, res){
        try {
            const comments = await Comment.find().sort({created: -1});
            res.status(200).json(comments);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }
}