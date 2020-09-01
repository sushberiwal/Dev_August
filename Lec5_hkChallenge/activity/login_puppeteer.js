// npm install puppeteer
// sudo npm install puppeteer
const puppeteer = require("puppeteer");
// object destructring
const {id , pw} = require("./credentials");
const challenges = require("./challenges");
// by default puppeteer runs in headless mode
let gTab;

(async function(){

    try{
        // buid browser
        const browser = await puppeteer.launch(
            {
                headless:false,
                defaultViewport:null,
                slowMo:50,
                args:["--start-maximized"]
            }
        );
    
        // build tab/page
        const pages = await browser.pages();
        const page = pages[0];
        gTab = page;
        //go to page
        await page.goto('https://www.hackerrank.com/auth/login');
        await page.type("#input-1" , id);
        await page.type("#input-2" , pw);
        await clickAndWait(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
        console.log("Logged in !!");

        await page.click('a[data-analytics="NavBarProfileDropDown"]');
        await clickAndWait('a[data-analytics="NavBarProfileDropDownAdministration"]');
        console.log("Clicked on administration");

        let bothItems = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
        // Array => 2 elements [ <li> </li> , <li></li> ] ;

        // console.log(bothItems[1]);
        // console.log(bothItems.length);
        await bothItems[1].click()
        let challengeUrl = await page.url();
        console.log(challengeUrl);
        await clickAndWait(".btn.btn-green.backbone.pull-right");
        await createChallenge(challenges[0]);
    }
    catch(err){
        console.log(err);
    }
})();


async function clickAndWait(selector){
    try{
       await Promise.all(  [gTab.click(selector) , gTab.waitForNavigation({waitUntil:"networkidle0"}) ] );
    }
    catch(err){
        console.log(err);
    }
}

async function createChallenge(ch){
    
    await gTab.waitForSelector("#name" , {visible:true});
    await gTab.type("#name" , ch["Challenge Name"]);
    await gTab.type("#preview" , ch["Description"]);
    await gTab.type("#problem_statement-container .CodeMirror textarea" , ch["Problem Statement"]);
}