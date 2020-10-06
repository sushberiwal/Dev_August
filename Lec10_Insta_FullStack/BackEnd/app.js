// npm init -y
// npm install express
// npm install nodemon

const express = require("express");
const userDB = require("./db/users.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// server created
const app = express();

// api logic

// req = request => from ui , from postman
// res = response => to ui , to postman
// to see data in request body use this
// middleware function
app.use(express.json());


// app.get("/home" , function(req,res){
//     console.log(req.body);

//     res.json({
//         message : "success",
//         data : req.body
//     })
// })

// post a user => add a user in userDB
app.post("/user" , function(req,res){
    // console.log(req.body);
    let uid = uuidv4();
    let user = req.body;
    user.uid = uid;
    userDB.push(user);
    fs.writeFileSync("./db/users.json" , JSON.stringify(userDB));

    res.json({
        message:"successfully added a user",
        data : req.body
    })
})

// get all user
app.get("/user" , function(req,res){
    res.json({
        message :"Succesfully get all user",
        data : userDB.length ? userDB : "User DB empty !"
    })
})

// get a user with the help of uid

// update a user with the help of uid

// delete a user with the help if uid


app.listen(3000 , function(){
    console.log("Server started at port 3000 ");
})