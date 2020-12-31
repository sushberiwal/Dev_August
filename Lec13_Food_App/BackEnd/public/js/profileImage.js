const profileImage = document.querySelector("#profileImage");


profileImage.addEventListener("change" , async function(e){
    e.preventDefault();
    let file = profileImage.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("user" , file);
    let obj = await axios.patch("http://localhost:3000/api/user/updateprofilephoto" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})