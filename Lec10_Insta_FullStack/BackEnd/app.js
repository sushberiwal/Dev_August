// npm init -y
// npm install express
// npm install nodemon

const express = require("express");

const app = express();

// api logic

// req = request => from ui , from postman

// res = response => to ui , to postman

// to see data in request body use this
app.use(express.json());


app.get("/home" , function(req,res){
    console.log(req.body);

    res.json({
        message : "success",
        data : req.body
    })
})

// post a user => add a user in userDB
// get a user with the help of id
// get all user
// update a user with the help of uid
// delete a user with the help if uid



app.listen(3000 , function(){
    console.log("Server started at port 3000 ");
})