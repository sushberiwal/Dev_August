let images = ["./images/89125115b0e10b94e3378d484712450727-25-thanos.rsocial.w1200.jpg" ,
"./images/97d1d9f934a350cee765c5ac1a466605.jpg" , "./images/Thanos_MCU.jpg"];

function changeImage(){
    let allImages = document.querySelectorAll("img");
    for(let i=0 ; i<allImages.length ; i++){
        let idx = Math.floor(Math.random() * images.length);
        console.log(idx);
        // console.log(chrome.extension.getURL("images/Thanos_MCU.jpg"));
        allImages[i].src = chrome.extension.getURL(images[idx]) ;
    }
}


// event listener
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    changeImage();
    sendResponse("Hello from content");
});