// document manipulation
// let body = document.querySelector("body");
// let ul = document.querySelector("ul");
// let h1Tag = document.createElement("h1");
// <h1></h1>
// h1Tag.innerText = "Dynamically added";
//<h1>Dynamically Added</h1>
// body.appendChild(h1Tag);

// let li = document.createElement("li");
// li.innerText = "I am first li";
// ul.appendChild(li);

// ul.innerHTML = `<li>I am first li</li>
//                 <li>I am second li</li>
//                  <li>I am third li</li>`;

//DOM Events based functions
let btn = document.querySelector("#add");
let inputTag = document.querySelector("#task");
let ul = document.querySelector("ul");

btn.addEventListener("click" , function(){
    let value = inputTag.value;
    inputTag.value = "";
    // falsy values = "" , undefined , null , 0
    if(value){
        let li = document.createElement("li");
        li.innerText = value;
        ul.appendChild(li);
    }else{
        alert("Enter some task !!!");
    }
})




// npm install electron-packager --save-dev
