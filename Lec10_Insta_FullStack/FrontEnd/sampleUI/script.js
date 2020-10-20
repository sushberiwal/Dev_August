let search = document.querySelector(".search");
let user = document.querySelector("#search-user");
let profileName = document.querySelector(".profile-name");
let handle = document.querySelector(".profile-handle");
let bio = document.querySelector(".profile-bio")
let followerCount = document.querySelector(".follower-count");
let followingCount = document.querySelector(".following-count");

search.addEventListener("click" , async function(){
    let value = user.value;
    // consoleh.log(value);
    let users = await axios.get(`http://localhost:3000/user/${value}`);
    let profile = users.data.data;
    profileName.innerHTML = profile.name;
    handle.innerHTML = profile.handle;
    bio.innerHTML = profile.bio;


    let followingDetails = await axios.get(`http://localhost:3000/user/following/${value}`);
    followingDetails = followingDetails.data.data;
    followingCount.innerHTML = followingDetails.length;


    let followerDetails = await axios.get(`http://localhost:3000/user/follower/${value}`);
    followerDetails = followerDetails.data.data;
    followerCount.innerHTML = followerDetails.length;



})