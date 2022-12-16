const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const COM = require('../controllers/com');
const Check = require('../utils/checkAuth');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.filename+"_"+Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage: storage
}).single("image");

router.get("/", API.fetchAllPost);
router.get("/:id", API.fetchPostByID);
router.post("/", upload, API.createPost);
router.patch("/:id", upload, API.updatePost);
router.delete("/:id", API.deletePost);
// router.get('/:id/comment', COM.fetchPostByIDForComment);
// router.get('/:id/comment', COM.fetchComById);
// router.post('/:id/comment', COM.createComment);

module.exports = router;