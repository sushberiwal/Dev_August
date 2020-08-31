//promises parallely 

let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

for(let i=0 ; i<files.length ; i++){
    
    let fileReadPromise = fs.promises.readFile(files[i]);
    fileReadPromise.then(function(data){
        console.log("Content " + data);
    })
    fileReadPromise.catch(function(error){
        console.log(error);
    })
}
