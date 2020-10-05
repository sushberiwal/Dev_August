
socket.on("receive-msg" , function(obj){
    let chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.classList.add("left");
    chatItem.innerHTML = `${obj.name}: ${obj.message}`;
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;
}) 


socket.on("new-user" , function(name){
    let chatItem = document.createElement("div");
    chatItem.classList.add("join");
    chatItem.innerHTML = `${name} joined chat`;
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;
})


socket.on("left-chat" , function(name){
    let chatItem = document.createElement("div");
    chatItem.classList.add("leave");
    chatItem.innerHTML = `${name} left chat`;
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;
})