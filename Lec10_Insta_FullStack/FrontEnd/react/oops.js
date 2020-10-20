// super();
// this;
// constructor();
// this is not static
// it is determined at the run time 

class Bike{

    constructor(name , price , color){
        this.name = name;
        this.price = price;
        this.color = color;
    }
}
// let bullet = new Bike("bullet" , "2lacs" , "black");
// console.log(bullet);


class Vehicle extends Bike{
    constructor(type , name , price , color){
        super(name , price , color); // constructor of bike class is fired
        this.type = type;
    }

}


let superbike = new Vehicle("bike" , "hayabusa" , "20lacs" , "white"); 
console.log(superbike);






