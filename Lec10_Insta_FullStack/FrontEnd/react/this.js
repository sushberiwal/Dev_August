
let obj = {
    name : "Sushant",
    sayHi : function(){
        console.log("Insdie say Hi ");
        console.log(this.name);
        // arrow function
        myFun = () =>{
            console.log("inside myFun");
            console.log(this);
        }
        // myFun();
        // ES5 syntax
        myFun();
    }

}


obj.sayHi();

// by default function call me => this is global object;
// object ki method call me => this is current object;
