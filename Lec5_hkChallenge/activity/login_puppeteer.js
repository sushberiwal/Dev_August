// npm install puppeteer
// sudo npm install puppeteer
const puppeteer = require("puppeteer");
// object destructring
const {id , pw} = require("./credentials");

// by default puppeteer runs in headless mode

(async function(){
    // buid browser
    const browser = await puppeteer.launch(
        {
            headless:false,
            defaultViewport:null,
            slowMo:100,
            args:["--start-maximized"]
        }
    );

    // build tab/page
    const pages = await browser.pages();
    const page = pages[0];

    //go to page
    await page.goto('https://www.hackerrank.com/auth/login');
    await page.type("#input-1" , id);
    await page.type("#input-2" , pw);
    await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    console.log("Logged in !!");
    await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await page.click('a[data-analytics="NavBarProfileDropDown"]');    
    await page.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await page.click('a[data-analytics="NavBarProfileDropDownAdministration"');
    console.log("Clicked on administration");
})();
