//Synchronous => Serial Code => top to down => left to right 

let fs = require("fs");
console.log("Before");

let content1 = fs.readFileSync("./f1.txt" , "utf-8");
console.log(content1);
let content2 = fs.readFileSync("./f1.txt" , "utf-8");
console.log(content2);
let content1 = fs.readFileSync("./f1.txt" , "utf-8");
console.log(content3);

console.log("After");