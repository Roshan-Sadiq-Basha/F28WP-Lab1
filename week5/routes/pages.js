const express = require('express');
const authController = require('../controllers/auth.js');
const cookieParser = require('cookie-parser')
const router = express.Router();


// Add the route definition for a /profile endpoint
router.get('/profile',authController.isLoggedIn,(req, res) => {
    // Your profile page logic here
    res.render('profile', { user: req.user });
  });


module.exports = router;
