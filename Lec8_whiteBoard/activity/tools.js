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
let pencilSlider = document.querySelector("#pencil-size");
let eraserSlider = document.querySelector("#eraser-size");

let eraserWidth = 1;
let pencilWidth = 1;
let activeTool = "pencil";

pencil.addEventListener("click", function () {
    console.log("clicked on pencil");
    if (activeTool == "pencil") {
        if (pencilOptions.classList.contains("active")) {
            pencilOptions.classList.remove("active");
        } else {
            pencilOptions.classList.add("active");
        }
    } else {
        activeTool = "pencil";
        ctx.lineWidth = pencilWidth;
        ctx.strokeStyle = "black";
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
        eraserOptions.classList.remove("active");
    }
});

eraser.addEventListener("click", function () {
    console.log("clicked on eraser");
    if (activeTool == "eraser") {
        if (eraserOptions.classList.contains("active")) {
            eraserOptions.classList.remove("active");
        } else {
            eraserOptions.classList.add("active");
        }
    } else {
        activeTool = "eraser";
        ctx.strokeStyle = "white";
        ctx.lineWidth = eraserWidth;
        eraser.classList.add("active-tool");
        pencil.classList.remove("active-tool");
        pencilOptions.classList.remove("active");
  }

});

undo.addEventListener("click", function () {
  undoPoints();
});

redo.addEventListener("click", function () {
  redoLines();
});

black.addEventListener("click", function () {
  ctx.strokeStyle = "black";
});

blue.addEventListener("click", function () {
  ctx.strokeStyle = "blue";
});
red.addEventListener("click", function () {
  ctx.strokeStyle = "red";
});
yellow.addEventListener("click", function () {
  ctx.strokeStyle = "yellow";
});



pencilSlider.addEventListener("change" , function(){
    // console.log(pencilSlider.value);
    ctx.lineWidth = pencilSlider.value;
    pencilWidth = pencilSlider.value;
})
eraserSlider.addEventListener("change" , function(){
    // console.log(pencilSlider.value);
    ctx.lineWidth = eraserSlider.value;
    eraserWidth = eraserSlider.value;
})

