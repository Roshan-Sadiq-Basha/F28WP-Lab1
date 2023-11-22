const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const path = require("path");
const app = express()
const port = 5000;
const cookieParser = require('cookie-parser');


const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


app.use(cookieParser());

exports.register = (req,res)=>{
    console.log(req.body);
    const {name,email,password,passwordConfirm} =req.body;

    db.query("SELECT email FROM users WHERE email = ?",[email], async(error,result) => {
        if (error) {
            console.log(error)
        }
        if (result.length >0){
            return res.render("register"),{
                message: 'This email is already taken'
        }}
            else if (password != passwordConfirm){
                return res.render("register"),{
                    message: "Passwords do not match"
                }};

         let hasedPassword = await bcrypt.hash(password,8);
         console.log(hasedPassword)

         db.query("INSERT INTO users SET ?", {name:name, email:email , password:hasedPassword},(error,results) => {
         if (error) {
            console.log(error);
         }
         else{
            console.log(results);
            return res.render("register",{
                message: "User registered"
            });
         }
        })
        })
}

exports.login = (req, res) => {
try {
    const {email,password} =req.body;
    
    if (!email || !password){
        return res.status(400).render("login",{
            messsage:"provid emaio"
        })
    }
    db.query(`SELECT * FROM users WHERE email = ?`,[email],async(error,results)=>{
        console.log(results)
        if (!results || !(await bcrypt.compare(password,results[0].password))){
            res.status(401).render("login",{
                message:"email or password is incorrect"
            })
        } else{
            const id = results[0].id;
            const token = jwt.sign({ id } , process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("THE Token is"+token) 

            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("jwt", token, cookieOptions);
            res.status(200).redirect("/profile");
        }
    })
} catch(error){
    console.log(error)
}
}



exports.isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
                if (error) {
                    console.log(error);
                    return res.redirect('/error');
                }

                if (result.length > 0) {
                    req.user = result[0];
                    return next();
                } else {
                    return res.redirect('/profile');
                }
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/error');
        }
    } else {
        return res.redirect('/login');
    }
}
