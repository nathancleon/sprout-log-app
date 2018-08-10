const express = require('express');
const authController = require('./auth.controller');

let router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

module.exports = router;