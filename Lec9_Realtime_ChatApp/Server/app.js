// npm init -y
// npm install express => to create server
// npm install socket.io => to enable socket io
// npm install nodemon => to automatically refresh server on the changes\

const app = require("express")(); // create a server
const http = require("http").createServer(app);
const io = require("socket.io")(http); // socket io enabled

const userDB = [];

// when a socket connects to app.js
io.on("connection", function (socket) {
  console.log(`${socket.id} connected`);

  socket.on("message-send", function (msg) {
       let id = socket.id;
       let name;
       for(let i=0 ; i<userDB.length ; i++){
           if(userDB[i].id == id){
               name = userDB[i].name;
               break;
           }
       }
    socket.broadcast.emit("receive-msg", {name : name , message : msg});
  });

  socket.on("new-user-connected", function (name) {
    let obj = { id: socket.id, name: name };
    userDB.push(obj);
    socket.broadcast.emit("new-user" , name);
  });

  socket.on('disconnect', function(){
    let id = socket.id;
    let name;
    let idx;
    for(let i=0 ; i<userDB.length ; i++){
        if(userDB[i].id == id){
            name = userDB[i].name;
            idx=i;
            break;
        }
    }
    // splice function ( idx , count of elements to delte  );
    userDB.splice(idx , 1);
    socket.broadcast.emit("left-chat", name);
  });
});

http.listen(5001, () => {
  console.log("listening on *:3000");
});
