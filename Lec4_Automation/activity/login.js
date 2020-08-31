// in dev_august folder
// npm install selenium-webdriver
// npm install chromedriver
//selenium => all functions gives promises
require("chromedriver");

let swd = require("selenium-webdriver");
const { id, pw } = require("./credentials");

let gCodes;

let gCode;
let gCustomTextBox;
let gCodeBox;
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
    let idPwPromise = Promise.all([idPromise, pwPromise]);
    return idPwPromise;
  })
  //type email && type pw
  .then(function (LoginElementsArr) {
    let idTypedPromise = LoginElementsArr[0].sendKeys(id);
    let pwTypedPromise = LoginElementsArr[1].sendKeys(pw);
    let idPwTypedPromise = Promise.all([idTypedPromise, pwTypedPromise]);
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
    //all questions links
    let quesSubmitPromise = questionSubmitter(allHrefs[0]);
    for (let i = 0; i < allHrefs.length; i++) {
      quesSubmitPromise = quesSubmitPromise.then(function () {
        let nextQuesSubmitP = questionSubmitter(allHrefs[i]);
        return nextQuesSubmitP;
      });
    }
    return quesSubmitPromise;
  })
  .then(function () {
    console.log("Question submitted successfully !");
  })
  .catch(function (err) {
    console.log(err);
  });

function navigatorFn(selector) {
  console.log("Inside Navigator Function");
  let promise = new Promise(function (resolve, reject) {
    let elementFindPromise = driver.findElement(swd.By.css(selector));
    elementFindPromise
      .then(function (element) {
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
function handleLockButton() {
  return new Promise(function (resolve, reject) {
    let findElementPromise = driver.findElement(swd.By.css(".editorial-content-locked .ui-btn.ui-btn-normal.ui-btn-primary"));
    findElementPromise.then(function (element) {
        const actions = driver.actions({async: true});
        let lockBtnPressed =  actions.move({origin:element}).click().perform();
        return lockBtnPressed;
      })
      .then(function () {
        console.log("Lock btn clicked");
        resolve();
      })
      .catch(function (error) {
        console.log("Lock btn not found !!");
        resolve();
      });
  });
}
function pasteCode() {
  return new Promise(function (resolve, reject) {
    let problemClickedP = navigatorFn('a[data-attr2="Problem"]');
    problemClickedP
      .then(function () {
        let customClickedPromise = navigatorFn(".custom-input-checkbox");
        return customClickedPromise;
      })
      .then(function () {
        let customInputP = driver.findElement(swd.By.css(".custominput"));
        return customInputP;
      })
      .then(function (element) {
        gCustomTextBox = element;
        let codeTypedPromise = element.sendKeys(gCode);
        return codeTypedPromise;
      })
      .then(function () {
        let ctrlAPromise = gCustomTextBox.sendKeys(swd.Key.CONTROL + "a");
        return ctrlAPromise;
      })
      .then(function () {
        let ctrXPromise = gCustomTextBox.sendKeys(swd.Key.CONTROL + "x");
        return ctrXPromise;
      })
      .then(function () {
        let inputBoxPromise = driver.findElement(swd.By.css(".inputarea"));
        return inputBoxPromise;
      })
      .then(function (element) {
        gCodeBox = element;
        let inputBoxSelectPromise = element.sendKeys(swd.Key.CONTROL + "a");
        return inputBoxSelectPromise;
      })
      .then(function () {
        let codePastedPromise = gCodeBox.sendKeys(swd.Key.CONTROL + "v");
        return codePastedPromise;
      })
      .then(function () {
        console.log("Code pasted in code box !!!");
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
function getCode() {
  return new Promise(function (resolve, reject) {
    // => get array of codes heading ["c++" , "pyhton","swift"];
    let codeNamesPromise = driver.findElements(
      swd.By.css(".hackdown-content h3")
    );
    // => get array of codes[ "code of c++" , "code of python", "code of swift"];
    let codePromise = driver.findElements(
      swd.By.css(".hackdown-content .highlight")
    );
    // =>  [       ["c++" , "pyhton","swift"] ,   [ "code of c++" , "code of python", "code of swift"]    ];
    let codesArrayPromise = Promise.all([codeNamesPromise, codePromise]);
    codesArrayPromise
      .then(function (codesElements) {
        let namesOfCodes = codesElements[0];
        gCodes = codesElements[1];

        let codeNamesPromise = [];

        for (let i = 0; i < namesOfCodes.length; i++) {
          let pP = namesOfCodes[i].getText();
          codeNamesPromise.push(pP);
        }
        let pendingPromise = Promise.all(codeNamesPromise);
        return pendingPromise;
      })
      .then(function (codeElementsName) {
        let codesName = codeElementsName;
        let idx = codesName.indexOf("C++");
        let codePromise = gCodes[idx].getText();
        return codePromise;
      })
      .then(function (code) {
        gCode = code;
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
function questionSubmitter(quesLink) {
  // console.log(quesLink);
  return new Promise(function (resolve, reject) {
    let quesClickedPromise = driver.get(quesLink);
    quesClickedPromise
      .then(function () {
        let editorialClickedPromise = navigatorFn('a[data-attr2="Editorial"]');
        return editorialClickedPromise;
      })
      .then(function () {
        let lockBtnPromise = handleLockButton();
        return lockBtnPromise;
      })
      .then(function () {
        let getCodePromise = getCode();
        return getCodePromise;
      })
      .then(function () {
        let pasteCodePromise = pasteCode();
        return pasteCodePromise;
      })
      .then(function () {
        let codeSubmitPromise = navigatorFn(
          ".pull-right.btn.btn-primary.hr-monaco-submit"
        );
        return codeSubmitPromise;
      })
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
