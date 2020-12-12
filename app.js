const express = require("express");
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

app.set('view engine', 'ejs');

app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized: true
}))

app.use(express.urlencoded({extended: true}));

//routes
app.get("/", function(req, res){
    res.render("index");
});

app.post("/", async function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    
    let hashedPwd = "$2a$10$06ofFgXJ9wysAOzQh0D0..RcDp1w/urY3qhO6VuUJL2c6tzAJPfj6";
    let passwordMatch = await checkPassword(password, hashedPwd);
    
    if(username =='admin' && password=='secret') {
        res.render("welcome");
    } else {
        res.render("index", {"loginError":true});
    }
})

function checkPassword(password, hashedValue) {
    return new Promise( function(resolve, reject){
        bcrypt.compare(password, hashedValue, function(err, result){
            console.log("Result: " + result);
            resolve(result);
        })
    })
}

//Listener
app.listen(8080, "0.0.0.0", function(){
    console.log("Running express server");
})