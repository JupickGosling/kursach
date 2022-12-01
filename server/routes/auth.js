const express = require('express');
const router = express.Router();
const AUTH = require('../controllers/auth');

router.get('/login/:email', AUTH.loginUser);
router.post("/register", AUTH.registerUser);
router.get("/", AUTH.fetchAllUser);

module.exports = router;