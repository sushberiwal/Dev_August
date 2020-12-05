let allImages = document.querySelectorAll("img");



for(let i=0 ; i<allImages.length ; i++){

    console.log(chrome.extension.getURL("images/Thanos_MCU.jpg"));
    allImages[i].src = chrome.extension.getURL("images/Thanos_MCU.jpg") ;

}