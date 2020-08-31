require("chromedriver");

let swd = require("selenium-webdriver");
const { id, pw } = require("./credentials");

// build browser
let bldr = new swd.Builder();
//create new tab
let driver = bldr.forBrowser("chrome").build();
//open a page in that tab
(async function(){
    try{
        await driver.get("https://www.hackerrank.com/auth/login");
        await driver.manage().setTimeouts({ implicit: 5000 });
        let idPromise = driver.findElement(swd.By.css("#input-1"));
        let pwPromise = driver.findElement(swd.By.css("#input-2"));
        let idPwPromise = await Promise.all([idPromise, pwPromise]);
        let idTypedPromise = idPwPromise[0].sendKeys(id);
        let pwTypedPromise = idPwPromise[1].sendKeys(pw);
        await Promise.all([idTypedPromise, pwTypedPromise]);
        let loginBtn = await driver.findElement(swd.By.css("button.auth-button"));
        await loginBtn.click();
    }
    catch(err){
        console.log(err);
    }

})();