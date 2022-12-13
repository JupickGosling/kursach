const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

module.exports = class API {
    static async fetchAllPost(req, res){
        try {
            const posts = await Post.find().sort({created: -1});
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    static async fetchPostByID(req, res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id).populate('comments');
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
        // Post.findById(req.params.id).populate('comments').exec(function(err, results) {
        //     if(err) {console.log(err)}
        //      res.render('post', {title: 'Post details', post: 
        //    results, comments: results.comments})
        //     })
    }

    static async createPost(req, res){
        try {
            const {title, category, content} = req.body
            const user = await User.findById(req.userId)

            // if(req.files){
            //     let fileName = Date.now().toString() + req.files.image.name
                
            // }
            const post = new Post({
                username: user.username,
                title,
                category,
                content,
                author: req.userId,
            })
            const imagename = req.file.filename;
            post.image = imagename;
            try {
                await Post.create(post);
                await User.findByIdAndUpdate(req.userId, {
                    $push: {posts: post},
                })
                res.status(201).json({message: 'Post created!'});
            } catch (err) {
                res.status(400).json({message: err.message});
            }
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    static async updatePost(req, res){
        const id = req.params.id;
        let new_image = '';
        if(req.file){
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err)
            }
        }else{
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost)
            res.status(200).json({message: "Post updated!"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    static async deletePost(req, res){
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync("./uploads/" + result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({message: 'Post deleted!'})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }
}