const chatBox = document.querySelector(".chat-box");
const messageInput = document.querySelector("#chat");
const send = document.querySelector(".chat-send");


const name = prompt("Enter your name ");

socket.emit("new-user-connected" , name);


send.addEventListener("click" , function(){
    let msg = messageInput.value;
    if(msg){
        let chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");
        chatItem.classList.add("right");
        chatItem.innerHTML = msg;
        chatBox.appendChild(chatItem);
        messageInput.value="";
        chatBox.scrollTop = chatBox.scrollHeight;
        socket.emit("message-send" , msg );
    }
})