const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let points = [];
let redoPoints = [];
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
// ctx.fillStyle = "red";
// ctx.fillRect(100, 100 , 150 , 100);
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  redraw();
});

// ctx.beginPath();
// ctx.moveTo(100 , 100);
// ctx.lineTo(200 , 100);
// ctx.lineTo(200 , 300);
// ctx.stroke();
ctx.lineWidth = 10;

let isPenDown = false;
canvas.addEventListener("mousedown", function (e) {
  let { top } = canvas.getBoundingClientRect();
  let x = e.clientX;
  let y = e.clientY - top;
  let point = {
    id: "md",
    x: x,
    y: y,
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };
  points.push(point);
  ctx.beginPath();
  ctx.moveTo(x, y);
  isPenDown = true;
});

canvas.addEventListener("mousemove", function (e) {
  if (isPenDown == true) {
    let { top } = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    let point = {
      id: "mm",
      x: x,
      y: y,
      color: ctx.strokeStyle,
      width: ctx.lineWidth,
    };
    points.push(point);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", function (e) {
  isPenDown = false;
  ctx.closePath();
  // console.log(points);
});

function redraw() {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ctx.lineWidth = point.width;
    ctx.strokeStyle = point.color;
    if (point.id == "md") {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }
}

function undoPoints() {
  let redoPoint = [];
  // 1. remove point from points
  if (points.length >= 2) {
    let idx = points.length - 1;
    while (points[idx].id != "md") {
      redoPoint.unshift(points.pop());
      idx--;
    }
    redoPoint.unshift(points.pop());
  }
  redoPoints.push(redoPoint);
  // 2. clear canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // 3. redraw points
  redraw();
}

function redoLines() {
  if (redoPoints.length >= 1) {
    let redoPoint = redoPoints.pop();
    for (let i = 0; i < redoPoint.length; i++) {
      points.push(redoPoint[i]);
    }
    // 2. clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // 3. redraw points
    redraw();
  }
}
