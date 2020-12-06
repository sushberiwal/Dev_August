// let blockList = [ {site:"www.youtube.com" , time:"10"} , {site:"www.facebook.com" , time:"6"}  ];
let blockList = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == "add"){
        blockList.push({site:request.site , time:"10"});
    }
    else if(request.type == "delete"){
        blockList = blockList.filter( function(siteObj){
            return siteObj.site != request.site;
        });
    }
    sendResponse(true); 
});


// active tab find =>
// match active tab with any of the blocklsit website
// if matches = time--
// if time <= 0 => site shoudl not be allowed to open
async function polling(){
    console.log(blockList);

    let tab = await getActiveTab();
    if(tab){
        let tabUrl = tab.url;
        for(let i=0 ; i<blockList.length ; i++){
            if(tabUrl.includes( blockList[i].site )){
                blockList[i].time--;
                if(blockList[i].time <= 0){
                    await deleteActiveTab(tab.id);
                }
            }
        }
    }
}

function deleteActiveTab(tabId){
    return new Promise(function(resolve , reject){
        chrome.tabs.remove(tabId , function(){
            resolve();
        })
    })
}
function getActiveTab(){
    return new Promise(function(resolve , reject){
        chrome.tabs.query({active: true, currentWindow: true} , function(tabs) {
            resolve(tabs[0]);
        });
    })
}

setInterval(polling , 1000);











