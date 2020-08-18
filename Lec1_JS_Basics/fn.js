// callback functions ???

function getFirstName(fullName){
// it will return firstname
let firstName = fullName.split(" ")[0];
return firstName;
}

function getLastName(fullName){
// it will return lastname
let lastName = fullName.split(" ")[1];
return lastName;
}

// High Order Function -> functions which take another functions as a arguments 
function greeter( fullName , callBack){

    let name = callBack(fullName);
    console.log(name);
}


greeter( "Steve Rogers" , getFirstName );



greeter( "Steve Rogers" , getLastName );

