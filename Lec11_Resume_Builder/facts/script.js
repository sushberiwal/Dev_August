let signUpForm = document.querySelector("#signup-form");
let emailInput = document.querySelector("#email")
let pwInput = document.querySelector("#password");


signUpForm.addEventListener("submit" , function(event){
    
    event.preventDefault();

    let email = emailInput.value;
    let pw = pwInput.value;

    console.log(email , "  " ,  pw);

    auth.createUserWithEmailAndPassword(email, pw).then( res =>{
        console.log(res);
    })
    .catch( err =>{
        console.log(err);
    })


})