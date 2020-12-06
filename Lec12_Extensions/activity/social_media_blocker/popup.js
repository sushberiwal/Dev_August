let blockButton = document.querySelector(".block");
let site = document.querySelector("#block-site");
let blockedSiteList = document.querySelector(".list-group");

blockButton.addEventListener("click", function () {
  let value = site.value;
  if (value) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    let i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-trash");
    let div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("justify-content-between");
    div.innerHTML += "<p>"+value+"</p>";
    div.append(i); 
    li.append(div);
    blockedSiteList.append(li);
    site.value = "";

    // await sendSiteToBeBlocked({type:"add" , site:value});

    // add site to be blocked !!
    chrome.runtime.sendMessage({type:"add" , site:value}, function(response) {
        console.log(response);
    });

    i.addEventListener("click", function () {
      i.parentNode.parentNode.remove();
      // delete site from the blocklist
      chrome.runtime.sendMessage({type:"delete" , site:value}, function(response) {
        console.log(response);
    });
    });
  
}
});


