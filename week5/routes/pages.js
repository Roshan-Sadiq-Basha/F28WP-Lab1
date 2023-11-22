const express = require('express');
const authController = require('../controllers/auth.js');
const cookieParser = require('cookie-parser')
const router = express.Router();


router.get('/profile',authController.isLoggedIn,(req, res) => {
    res.render('profile', { user: req.user });
  });


module.exports = router;
