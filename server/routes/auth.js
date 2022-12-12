const express = require('express');
const router = express.Router();
const AUTH = require('../controllers/auth');
const Check = require('../utils/checkAuth')
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,'./uploads');
    }
});

let upload = multer({
    storage: storage,
}).single();

router.post("/login", upload, AUTH.loginUser);
router.post("/register", upload, AUTH.registerUser);
router.get("/me", Check.checkAuth, AUTH.getMe);
router.get("/all", AUTH.fetchAllUser);

module.exports = router;