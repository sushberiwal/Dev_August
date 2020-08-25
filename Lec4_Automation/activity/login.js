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
pageOpenPromise.then(function(){
    let waitPromise = driver.manage().setTimeouts( { implicit: 5000 } );
    return waitPromise;
})
.then(function () {
    console.log("page opened");
    let idPromise = driver.findElement(swd.By.css("#input-1"));
    return idPromise;
  })
  .then(function (idElement) {
    let idEnteredPromise = idElement.sendKeys(id);
    return idEnteredPromise;
  })
  .then(function () {
    let pwPromise = driver.findElement(swd.By.css("#input-2"));
    return pwPromise;
  })
  .then(function (pwElement) {
    let pwEnteredPromise = pwElement.sendKeys(pw);
    return pwEnteredPromise;
  })
  .then(function (){
      let loginBtnPromise = driver.findElement(swd.By.css("button.auth-button"));
      return loginBtnPromise;
  })
  .then(function(loginBtn){
      let loginClickedPromise = loginBtn.click();
      return loginClickedPromise;
  }).then(function(){
      let ipKitPromise = driver.findElement(swd.By.css("#base-card-1-link"));
      return ipKitPromise;
  }).then(function(ipElement){
      let ipClickedPromise = ipElement.click();
      return ipClickedPromise;
  }).then(function(){
     let warmupFindP = driver.findElement(swd.By.css('a[data-attr1="warmup"]'));
     return warmupFindP;
  }).then(function(warmupElement){
      let warmupCLickedP = warmupElement.click();
      return warmupCLickedP;
  }).then(function(){
      let allQPromise = driver.findElements(swd.By.css(".js-track-click.challenge-list-item"));
      return allQPromise;
  }).then(function(allQues){

    let allQuesHrefPromise = [];
    for(let i=0 ; i<allQues.length ; i++){
       let quesLinkPromise =  allQues[i].getAttribute("href");
       allQuesHrefPromise.push(quesLinkPromise);
    }
    let allQuesP = Promise.all(allQuesHrefPromise);
    return allQuesP;  
  
}).then(function(allHrefs){
      console.log(allHrefs);
  })
  .catch(function (err) {
    console.log(err);
  });




  