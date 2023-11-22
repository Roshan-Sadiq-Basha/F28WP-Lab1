const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js")

router.post("/register",authController.register);

router.get("/",(req,res)=>{
  console.log("user"+ req.user);
  res.render("index")
})

router.post("/login",authController.login);

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');

  res.json({ success: true, message: 'Logout successful' });
  });


module.exports = router