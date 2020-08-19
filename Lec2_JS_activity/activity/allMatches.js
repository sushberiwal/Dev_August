let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const findDetails = require("./match");

function allMatches(link) {
  request(link, cb);
}

function cb(error, response, data) {
  //succesfull data received
  if (error == null && response.statusCode == 200) {
    parseData(data);
  }
  // page not found
  else if (response.statusCode == 404) {
    console.log("page Not found !!!!");
  }
  // error occured
  else {
    console.log(response);
    console.log(error);
  }
}


function parseData(data){

    let ch = cheerio.load(data);
    let allMatchesCards = ch(".col-md-8.col-16");
    for(let i=0 ; i<allMatchesCards.length ; i++){
        let matchLink = ch(allMatchesCards[i]).find(".match-cta-container a[data-hover='Scorecard']").attr("href");  
        let completeMatchLink = "https://www.espncricinfo.com"+matchLink; 
        findDetails(completeMatchLink);
        // console.log("#################################");
    }
}


module.exports = allMatches;
