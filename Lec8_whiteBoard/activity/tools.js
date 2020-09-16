let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

pencil.addEventListener("click", function () {
  console.log("clicked on pencil");
  ctx.strokeStyle = "black";
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
