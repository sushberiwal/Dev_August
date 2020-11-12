let signUpForm = document.querySelector(".signup-form");
let signInForm = document.querySelector(".signin-form");
let emailInput = document.querySelector("#email");
let nameInput = document.querySelector("#name");
let pwInput = document.querySelector("#password");

let signIn = document.querySelector("#signin");
let signUp = document.querySelector("#signup");
let logOut = document.querySelector("#logout");

// signin

let emailSi = document.querySelector("#email-si");
let pwSi = document.querySelector("#password-si");

//
let resumes = document.querySelector(".resumes-block");

auth.onAuthStateChanged(function(user) {
    if (user) {
        signIn.classList.add("hide");
        signUp.classList.add("hide");
        signInForm.classList.remove("active");
        signUpForm.classList.remove("active");
        logOut.classList.remove("hide");
        resumes.classList.remove("hide");
        console.log("inside auth state changed !!");
        let uid = user.uid;
        db.collection("user-table").doc(uid).get().then(user=>{
        document.querySelector(".welcome").innerHTML = "Welcome " + user.data().name;
      })
    } else {
        signIn.classList.remove("hide");
        signUp.classList.remove("hide");
        signInForm.classList.add("active");
        logOut.classList.add("hide");
        resumes.classList.add("hide");
       document.querySelector(".welcome").innerHTML = "Please Log In !";
    }
  });


signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = emailInput.value;
  let pw = pwInput.value;
  let name = nameInput.value;
  if (email && pw) {
    auth
      .createUserWithEmailAndPassword(email, pw)
      .then((res) => {
        db.collection("user-table")
          .doc(res.user.uid)
          .set({ name: name, email: email, pw: pw });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

signInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = emailSi.value;
  let pw = pwSi.value;
//   console.log(email, "  ", pw);
  if (email && pw) {
    auth.signInWithEmailAndPassword(email, pw).then(res=>{
        console.log(res.user);
    })
    .catch(err=>{
        console.log(err);
    })

  }
});

signIn.addEventListener("click", function (e) {
  e.preventDefault();
  signUpForm.classList.remove("active");
  signInForm.classList.add("active");
});
signUp.addEventListener("click", function (e) {
  e.preventDefault();
  signUpForm.classList.add("active");
  signInForm.classList.remove("active");
});


logOut.addEventListener("click", function (e) {
    e.preventDefault();
    auth.signOut();
});
