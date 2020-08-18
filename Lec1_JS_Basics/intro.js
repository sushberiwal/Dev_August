// console.log("Hello");
// java -> int , float , double , boolean , short , char , string , long .....
// int a = 10;
// String b = "asjdanskd"

//javascript -> undefined , null , object , Number , string , boolean

// ES6 -> let
let a = 10;
let s = "hello";
let m = true;
// console.log(a);
// console.log(s);
// console.log(m);

// sayHi(10);
// sayHi(true);
// sayHi( "Steve Rogers"  );
// sayHi( [10,20,30,40] );
function sayHi( val  ){
  console.log(val);
}
// variable can be passed as a paramter => functions can also be passed as a paramter 

// functions are variables ? 
let greeter = function(){
    console.log("I am a smaller function !");
    return 10;
}
sayHi( greeter() );
// greeter(); //function call ?













