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


const createUser = (req,res) => {
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
}

const getAllUsers = (req,res) => {
    console.log(req.body);
    res.json({
        message :"Succesfully get all user",
        data : userDB.length ? userDB : "User DB empty !"
    })
} 

const getById = (req,res) =>{
    let {uid} = req.params;
    // array
    let user = userDB.filter(  (userObj) => { return userObj.uid == uid  } );
    console.log(user);
    if(user.length){
        res.json({
            message:"get a user by id successfully",
            data : user[0]
        })
    }
    else{
        res.json({
            message:"User not found !!"
        })
    }
}

// arrow function
// post a user => add a user in userDB
app.post("/user" , createUser);
// get all user
app.get("/user" , getAllUsers);
// get a user with the help of uid
app.get("/user/:uid" , getById);

// update a user with the help of uid
app.patch("/user/:uid" , (req,res)=>{

    //?

})
// delete a user with the help if uid
app.delete("/user/:uid" , (req,res)=>{

    // ?

})

app.listen(3000 , () => {
    console.log("Server started at port 3000 ");
})