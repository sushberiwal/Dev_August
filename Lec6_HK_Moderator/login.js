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

async function handleSinglePage() {
  // for multiple selectors => $$
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
