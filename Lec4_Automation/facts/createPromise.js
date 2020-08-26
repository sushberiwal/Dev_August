let fs = require("fs");

function promisify(path) {
 let promise = new Promise(function(resolve , reject){

    fs.readFile(path , function(error , data){
        if(error){
            console.log("inside reject");
            reject(error);
        }
        else{
            console.log("inside resolve");
            resolve(data);
        }
    })
 });
 return promise;
}


//promisify returns a pending promise
let pPromise = promisify("./f1.txt");
pPromise.then(function (data) {     //=> resolve();
  console.log("Content " + data);
});
pPromise.catch(function (error) {   // => reject();
  console.log(error);
});
