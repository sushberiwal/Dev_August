class SuperBike{
    turbo;
    constructor(turbo){
        this.turbo = turbo;
    }
}



// superbike => propertry and methods

class Bike extends SuperBike{
    name;
    mileage;
    color;
    // methods
    constructor(name , mileage , color , turbo){
        super(turbo);  // it will call the constructor of extended class
        this.name =  name;
        this.mileage = mileage;
        this.color = color;
    }

    sayHi(){
        console.log(this);
        console.log(`${this.name} says Hii !!`);
    }

}

// this = >


let bullet = new Bike("bullet" , "12.6l" , "black" , "superfast");
bullet.sayHi();

// let abcd = new Bike("abcd" , "1231" , "blue");

// abcd.sayHi();





// class => method , property

// sfc => stateless  => props => ui render
// cc => stateful => initial state => ui render