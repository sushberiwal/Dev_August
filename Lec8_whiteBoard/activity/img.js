let upload = document.querySelector("#upload");
let download = document.querySelector("#download");


upload.addEventListener("change", function (e) {
  console.log(e);
  console.log(upload.files[0]);
  let reader = new FileReader();

  reader.onload = function (e) {
      let content = createBox();
      let img = document.createElement("img");
      img.src = e.target.result;
      img.setAttribute("class" , "uploaded-img");
      content.append(img);
  };

     //read the image file as a data URL.
      reader.readAsDataURL(upload.files[0]);
});


download.addEventListener("click" , function(){
    let a = document.createElement("a");
    let url = canvas.toDataURL("image/png");
    a.setAttribute("href" , url);
    a.setAttribute("download" , "file.png");
    a.click();
    a.remove();
})