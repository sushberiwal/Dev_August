const puppeteer = require("puppeteer");
// object destructring
const { id, pw } = require("./credentials");

let gTab;
let gBrowser;
(async function () {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      // slowMo:50,
      args: ["--start-maximized"],
    });
    gBrowser = browser;
    const pages = await browser.pages();
    const page = pages[0];
    gTab = page;
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", id);
    await page.type("#input-2", pw);
    await clickAndWait(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    await page.click('a[data-analytics="NavBarProfileDropDown"]');
    await clickAndWait(
      'a[data-analytics="NavBarProfileDropDownAdministration"]'
    );
    console.log("Clicked on administration");
    let bothItems = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await Promise.all([
      bothItems[1].click(),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    console.log("Reached Challenges Page");
    await handleSinglePage();
  } catch (err) {
    console.log(err);
  }
})();

// Recursive function
async function handleSinglePage() {
  // for multiple elements => $$ returns array of all elements
  await gTab.waitForSelector(".backbone.block-center", { visible: true });
  let anchorTags = await gTab.$$(".backbone.block-center");
  //array which contains all the links
  let questionLinksArray = [];
  for(let i=0 ; i<anchorTags.length ; i++){
    let link = await gTab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, anchorTags[i]);
      
      link = "https://www.hackerrank.com"+link;
      questionLinksArray.push(link);
  }
   console.log(questionLinksArray);
   // pending promises of all the moderators
   let allModeratorP = [];
   for(let i=0 ; i<questionLinksArray.length ; i++){
       let addModeratorPromise = addModerator(questionLinksArray[i]);
       allModeratorP.push(addModeratorPromise);
   }
   await Promise.all(allModeratorP);
   let lis = await gTab.$$(".pagination li");
   let next = lis[lis.length-2];
   let isDisabled = await gTab.evaluate( function(elem){return elem.classList.contains("disabled")}   , next );
   if(isDisabled){
       return;
   }
   await Promise.all(  [  next.click()  , gTab.waitForNavigation({waitUntil:"networkidle0"}) ]);
   await handleSinglePage();
}

async function handleConfirmBtn(tab){
    try{
        await tab.waitForSelector("#confirm-modal" , {visible:true , timeout:3000});
        await tab.click("#confirmBtn");
    }
    catch(err){
        console.log("Confirm Modal not found !!");
        return err;
    }
}

async function addModerator(link){
    try{
        let nTab = await gBrowser.newPage();
        await nTab.goto(link);
        await handleConfirmBtn(nTab);
        await nTab.waitForSelector('li[data-tab="moderators"]' , {visible:true});
        //networkidle0 -> there should be not more than 0 requests in a time frame of 500ms => Static websites
        //networkidle2 -> there should not more than 2 request in a time frame of 500ms => Client based 
        await Promise.all( [nTab.click('li[data-tab="moderators"]')] , nTab.waitForNavigation({waitUntil:"networkidle0"}) );
        await nTab.waitForSelector("#moderator" , {visible:true});
        await nTab.type("#moderator" , "sushant");
        await nTab.keyboard.press("Enter");
        await nTab.click(".save-challenge.btn.btn-green");
        await nTab.close();
    }
    catch(err){
        console.log(err);
    }
}


async function clickAndWait(selector) {
  try {
    await Promise.all([
      gTab.click(selector),
      gTab.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (err) {
    console.log(err);
  }
}
