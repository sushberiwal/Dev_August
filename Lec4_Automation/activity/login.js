// in dev_august folder
// npm install selenium-webdriver
// npm install chromedriver

//selenium => all functions gives promises

require("chromedriver");

let swd = require("selenium-webdriver");
const { id, pw } = require("./credentials");

// build browser
let bldr = new swd.Builder();
//create new tab
let driver = bldr.forBrowser("chrome").build();
//open a page in that tab
let pageOpenPromise = driver.get("https://www.hackerrank.com/auth/login");

// promise chaining =>
pageOpenPromise
  .then(function () {
    let waitPromise = driver.manage().setTimeouts({ implicit: 5000 });
    return waitPromise;
  })
  // find email input && find pw input
  .then(function () {
    console.log("page opened");
    let idPromise = driver.findElement(swd.By.css("#input-1"));
    let pwPromise = driver.findElement(swd.By.css("#input-2"));
    let idPwPromise = Promise.all( [ idPromise , pwPromise]   );
    return idPwPromise;
  })
  //type email && type pw
  .then(function (LoginElementsArr) {
       let idTypedPromise = LoginElementsArr[0].sendKeys(id);
       let pwTypedPromise = LoginElementsArr[1].sendKeys(pw);
       let idPwTypedPromise = Promise.all(  [idTypedPromise , pwTypedPromise] ); 
       return idPwTypedPromise;
  })
  .then(function () {
    let clickedPromise = navigatorFn("button.auth-button");
    return clickedPromise;
  })
  .then(function () {
    let ipKitPromise = navigatorFn("#base-card-1-link");
    return ipKitPromise;
  })
  .then(function () {
    let warmupFindP = navigatorFn('a[data-attr1="warmup"]');
    return warmupFindP;
  })
  .then(function () {
    let allQPromise = driver.findElements(
      swd.By.css(".js-track-click.challenge-list-item")
    );
    return allQPromise;
  })
  .then(function (allQues) {
    let allQuesHrefPromise = [];
    for (let i = 0; i < allQues.length; i++) {
      let quesLinkPromise = allQues[i].getAttribute("href");
      allQuesHrefPromise.push(quesLinkPromise);
    }
    let allQuesP = Promise.all(allQuesHrefPromise);
    return allQuesP;
  })
  .then(function (allHrefs) {
    console.log(allHrefs);
  })
  .catch(function (err) {
    console.log(err);
  });

function navigatorFn(selector) {
  console.log("Inside Navigator Function");
  let promise = new Promise(function (resolve, reject) {
    let elementFindPromise = driver.findElement(swd.By.css(selector));
    elementFindPromise
      .then(function(element) {
        let clickPromise = element.click();
        return clickPromise;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });

  return promise;
}
