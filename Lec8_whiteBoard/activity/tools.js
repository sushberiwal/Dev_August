let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");

pencil.addEventListener("click", function () {
    console.log("clicked on pencil");
    ctx.strokeStyle = "black";
});

eraser.addEventListener("click", function () {
    console.log("clicked on eraser");
    ctx.strokeStyle = "white";
});
