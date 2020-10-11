let search = document.querySelector("#search");
let uid = document.querySelector("#user-id");
search.addEventListener("click" , async function(e){
    e.preventDefault();
    let id = uid.value;
    console.log(id);
    let user = await axios.get("http://localhost:3000/user/8d0b0840-4790-46d5-9e4b-922416af6743");
    console.log(user);
})