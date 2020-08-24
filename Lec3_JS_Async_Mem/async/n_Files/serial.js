const fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

//async => serial task => n files read
//recursive code

console.log("Before");

function fileReader(idx){
    if(idx == files.length){
        return;
    }
    fs.readFile(files[idx] , function(err , data){
        console.log("Content : " + data);
        fileReader(idx+1);
    })
}
fileReader(0);



console.log("after");
