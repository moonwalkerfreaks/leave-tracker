const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { signupUser, loginUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/login', loginUser);


module.exports = router;
