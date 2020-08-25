let fs = require("fs");

console.log("before");

let pendingPromise = fs.promises.readFile("./f1.txt");

console.log(pendingPromise);

pendingPromise.then(function(data){
    console.log("content " + data);
});

pendingPromise.catch(function(err){
    console.log(err);
});


console.log("after");


