const express = require('express');
const router = express.Router();
const AUTH = require('../controllers/auth');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,'./uploads');
    }
});

let upload = multer({
    storage: storage,
}).single();

router.get('/login', AUTH.loginUser);
router.post("/register", upload, AUTH.registerUser);
router.get("/all", AUTH.fetchAllUser);

module.exports = router;