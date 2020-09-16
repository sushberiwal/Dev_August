let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let black = document.querySelector("#black");
let red = document.querySelector("#red");
let yellow = document.querySelector("#yellow");
let blue = document.querySelector("#blue");


let activeTool = "pencil";
ctx.strokeStyle = "black";


pencil.addEventListener("click", function () {
    console.log("clicked on pencil");
    if(activeTool == "pencil"){
        if(pencilOptions.classList.contains("active")){
            pencilOptions.classList.remove("active");
        }
        else{
            pencilOptions.classList.add("active");
        }
    }
    else{
        activeTool = "pencil";
    }
});

eraser.addEventListener("click", function () {
  console.log("clicked on eraser");
  ctx.strokeStyle = "white";
});

undo.addEventListener("click", function () {
    undoPoints(); 
});

redo.addEventListener("click" , function(){
    redoLines();
})

black.addEventListener("click" , function(){
    ctx.strokeStyle = "black";
})

blue.addEventListener("click" , function(){
    ctx.strokeStyle = "blue";
})
red.addEventListener("click" , function(){
    ctx.strokeStyle = "red";
})
yellow.addEventListener("click" , function(){
    ctx.strokeStyle = "yellow";
})