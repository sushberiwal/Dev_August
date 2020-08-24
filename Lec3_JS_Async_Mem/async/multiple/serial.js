let fs = require("fs");

console.log("before");
fs.readFile("../f1.txt", function (err, data) {
  console.log("Content of f1 :" + data);
  fs.readFile("../f2.txt", function (err, data) {
    console.log("Content of f2 :" + data);
    fs.readFile("../f3.txt", function (err, data) {
      console.log("Content of f3 :" + data);
    });
  });
});

console.log("after");
