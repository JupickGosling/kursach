const express = require('express');
const router = express.Router();
const COM = require('../controllers/com');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
});

let upload = multer({
    storage: storage
}).single("image");

// router.get("/:id", upload, COM.fetchPostByIDForComment);
router.get("/all", COM.fetchAllComment);
router.get("/:post_id", COM.fetchComById);
router.post("/", upload, COM.createComment);

module.exports = router;