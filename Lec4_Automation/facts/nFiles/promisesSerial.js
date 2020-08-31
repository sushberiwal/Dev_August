let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

let filePromise = fs.promises.readFile(files[0]);

for(let i=1 ; i<files.length ; i++){

    filePromise = filePromise.then(function(data){
        console.log("Content " + data);
        let nextFilePromise = fs.promises.readFile(files[i]);
        return nextFilePromise;
    })
}

filePromise.then(function(data){
    console.log("Content " + data);
})