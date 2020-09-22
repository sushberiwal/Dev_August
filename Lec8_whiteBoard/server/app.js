// inside server
// npm init -y 
// npm install express
// sudo npm install express
// npm install socket.io

const express = require("express");
// server is created
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// if we have a get request and we have a url of /home then we will get a response data as Welcome to home PAge
// app.get("/home" , function(req,res){
//     res.end("<h1>Welcome to home page !!!</h1>")
// })


io.on('connection', (socket) => {
    console.log(`${socket.id} user connected`);
    // socket.on("pencil" , function(data){
    //     console.log(data);
    // })

    socket.on("md" , function(point){
        socket.broadcast.emit("onmousedown" , point);
    })

    socket.on("mm" , function(point){
        socket.broadcast.emit("onmousemove" , point);
    })

  });


// app.get("/" , function(req,res){
//     res.end("<h1>Welcome to main Page</h1>")
// })


// server is live at localhost:5000
http.listen(3000, function(){
    console.log("Server started at port 3000 !")
});