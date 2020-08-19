let request = require("request");
let cheerio = require("cheerio");
const fs  = require("fs");
let link =
  "https://www.espncricinfo.com/series/8039/scorecard/656495/australia-vs-new-zealand-final-icc-cricket-world-cup-2014-15";
request(link, cb);

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
let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");

for(let i=0 ; i<bothInnings.length ; i++){
    let teamName = ch(bothInnings[i]).find(".header-title.label").text();
    teamName = teamName.split("Innings")[0].trim();
    console.log(teamName);
    let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
    for(let j=0 ; j<allRows.length ; j++){

        let allCols = ch(allRows[j]).find("td");
        if(allCols.length > 1){

            let batsmanName = ch(allCols[0]).find("a").text();
            let runs = ch(allCols[2]).text();
            let balls = ch(allCols[3]).text();
            let fours = ch(allCols[5]).text();
            let sixes = ch(allCols[6]).text();
            let strikeRate = ch(allCols[7]).text();

            console.log( `Batsman-> ${batsmanName} Runs-> ${runs} balls-> ${balls} fours-> ${fours} sixes-> ${sixes} SR-> ${strikeRate}`);
            console.log("------------------------------------------------------");
        }


    }


}

}