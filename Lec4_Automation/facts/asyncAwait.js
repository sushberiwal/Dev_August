let fs = require("fs");
// Async Await => Syntax Sugar => Promises

// IIFE => Immediately Invoked Function Expressions

// (function (){
//     //global values
//     console.log("hello i am IIFE");
// })();

// await => then ka alternative 
// async => return new Promise ka alternate ?

console.log("Before");

// async function will return pending promise 
async function fn(){

    // serially
    let file1KaData = await fs.promises.readFile("./f1.txt");
    let file2KaData = await fs.promises.readFile("./f2.txt");
    let file3KaData = await fs.promises.readFile("./f3.txt");
    
    //parallely
    let f1KaData = fs.promises.readFile("./f1.txt");
    let f2KaData = fs.promises.readFile("./f2.txt");
    let f3KaData = fs.promises.readFile("./f3.txt");
    
    let filesKaArray = await Promise.all( [ f1KaData , f2KaData , f3KaData  ]);
    
    console.log("Content " + filesKaArray[0]);
    console.log("Content " + filesKaArray[1]);
    console.log("Content " + filesKaArray[2]);
}

fn();


console.log("After");






