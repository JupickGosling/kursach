const Comment = require('../models/comment');
const Post = require('../models/Post')
const fs = require('fs');

module.exports = class COM {
    static async fetchComById(req, res){
        try {
            const comment = await Comment.find({post_id: req.params.post_id}).sort({created: -1});
            res.status(200).json(comment);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    static async createComment(req, res){
        try {
            const {postId, content} = req.body
            
            if(!content) return res.json({message: "Комментарий не может быть пустым!"})

            const newComment = new Comment({content})
            await newComment.save()

            try {
                await Post.findByIdAndUpdate(postId,{
                    $push: {comments: newComment._id}
                })
            } catch (err) {
                res.json({message: err})
            }

            res.json({message: 'Комментарий создан',newComment})
        } catch (err) {
            res.json({message: err})
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