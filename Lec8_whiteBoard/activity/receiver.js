socket.on("onmousedown" , function(point){
    // logic
    let {x , y , width , color} = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
})

socket.on("onmousemove" , function(point){
    //logic
    let {x , y , width , color} = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineTo(x,y);
    ctx.stroke();
})