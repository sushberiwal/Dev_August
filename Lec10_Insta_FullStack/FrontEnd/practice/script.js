let search = document.querySelector("#search");
let uid = document.querySelector("#user-id");
let userName = document.querySelector(".user-name");
let handle = document.querySelector(".user-handle");
let bio = document.querySelector(".user-bio");
let followersCount = document.querySelector(".followers-count .count");
let followCount = document.querySelector(".following-count .count");

search.addEventListener("click" , async function(e){
    e.preventDefault();
    let id = uid.value;
    console.log(id);
    let userObj = await axios.get(`http://localhost:3000/user/${id}`);
    console.log(userObj.data.data[0]);
    let user = userObj.data.data[0];
    let name = user.name;
    
    userName.innerHTML = name;
    handle.innerHTML = user.handle;
    bio.innerHTML = user.bio;
    
    let followObject = await axios.get(`http://localhost:3000/user/count/following/${id}`);
    let followersObject = await axios.get(`http://localhost:3000/user/count/followers/${id}`);
    
    followersCount.innerHTML = followersObject.data.followers;
    followCount.innerHTML = followObject.data.following;
})