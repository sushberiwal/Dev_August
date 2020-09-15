const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
// ctx.fillStyle = "red";
// ctx.fillRect(100, 100 , 150 , 100);
window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})


// ctx.beginPath();
// ctx.moveTo(100 , 100);
// ctx.lineTo(200 , 100);
// ctx.lineTo(200 , 300);
// ctx.stroke();
ctx.lineWidth = 10;

let isPenDown = false;
canvas.addEventListener("mousedown" , function(e){
    let {top} = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    ctx.beginPath();
    ctx.moveTo(x , y);
    isPenDown = true;
});

canvas.addEventListener("mousemove" , function(e){
    if(isPenDown == true){
        let {top} = canvas.getBoundingClientRect();
        let x = e.clientX;
        let y = e.clientY - top;
        ctx.lineTo(x , y);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup" , function(e){
    isPenDown = false;
    ctx.closePath();
})
