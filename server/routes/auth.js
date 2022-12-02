const express = require('express');
const router = express.Router();
const AUTH = require('../controllers/auth');

router.get('/login/:email/:password', AUTH.loginUser);
router.post("/register", AUTH.registerUser);
router.get("/all", AUTH.fetchAllUser);

module.exports = router;