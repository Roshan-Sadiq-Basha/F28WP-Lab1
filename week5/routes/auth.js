const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js")

router.post("/register",authController.register);



router.post("/login",authController.login);

router.post('/logout', (req, res) => {
    res.redirect('/auth/login');
  });


module.exports = router
