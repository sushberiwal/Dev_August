//fs -> fileSystem
// import ?
// import fileSystem Module 
// npm install cheerio

let fs = require("fs");
let cheerio = require("cheerio");
let htmlKaData = fs.readFileSync("./index.html");

// console.log(htmlKaData + "");

let ch = cheerio.load(htmlKaData);
let pTag = ch(".para.firstP").text();
// console.log(pTag);


let lis = ch("ul .firstLi").text();

// console.log(lis);


let h1 = ch("#mainHeading").text();
console.log(h1);

