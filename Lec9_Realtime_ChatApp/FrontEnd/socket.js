
socket.on("receive-msg" , function(msg){
    let chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.classList.add("left");
    chatItem.innerHTML = msg;
    chatBox.appendChild(chatItem);
}) 