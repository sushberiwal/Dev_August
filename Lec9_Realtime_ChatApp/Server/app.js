// npm init -y
// npm install express => to create server
// npm install socket.io => to enable socket io 
// npm install nodemon => to automatically refresh server on the changes\

const app = require('express')(); // create a server
const http = require('http').createServer(app);  
const io = require('socket.io')(http); // socket io enabled


// when a socket connects to app.js
io.on('connection', function(socket){
  
    console.log(`${socket.id} connected`);

    socket.on("message-send" , function(msg){
        socket.broadcast.emit("receive-msg" , msg);
    })

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

