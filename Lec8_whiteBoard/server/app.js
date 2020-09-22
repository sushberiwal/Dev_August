// inside server
// npm init -y 
// npm install express
// sudo npm install express


const express = require("express");


// server is created
const app = express();

// if we have a get request
app.get("/home" , function(req,res){
    res.end("<h1>Welcome to home page !!!</h1>")
})

app.get("/" , function(req,res){
    res.end("<h1>Welcome to main Page</h1>")
})

app.listen(5000 , function(){
    console.log("Server is listening at port 5000 !!");
})
