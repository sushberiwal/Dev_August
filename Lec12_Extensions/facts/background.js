chrome.tabs.onCreated.addListener(function(tab){
    console.log(tab);
})


chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    console.log(tab);
    // console.log(changeInfo);
    // console.log(tabId);
    // url = "https://www.youtube.com"
    if(tab.url.includes("youtube")){
        chrome.tabs.remove(tabId);
    }
})