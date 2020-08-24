let request = require("request");
let cheerio = require("cheerio");
const fs  = require("fs");
let path = require("path");

let leaderBoard = [];
let count=0;

function findDetails(link){
    count++;  
    console.log("Sending Request " + count);
    request(link, cb);
}

function cb(error, response, data) {
  //succesfull data received
  if (error == null && response.statusCode == 200) {
      parseData(data);
      count--;
      console.log("Recieved Data " + count);
      if(count == 0){
          console.table(leaderBoard);
      }
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
let summary = ch(".summary span").text();
let wTeam = summary.split("won")[0].trim();
// console.log(summary);


let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");

for(let i=0 ; i<bothInnings.length ; i++){
    let teamName = ch(bothInnings[i]).find(".header-title.label").text();
    teamName = teamName.split("Innings")[0].trim();
    
    if(teamName == wTeam){
        let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
        for(let j=0 ; j<allRows.length ; j++){
    
            let allCols = ch(allRows[j]).find("td");
            if(allCols.length > 1){
    
                let batsmanName = ch(allCols[0]).find("a").text().trim();
                let runs = ch(allCols[2]).text().trim();
                let balls = ch(allCols[3]).text().trim();
                let fours = ch(allCols[5]).text().trim();
                let sixes = ch(allCols[6]).text().trim();
                let strikeRate = ch(allCols[7]).text().trim();
                

                // console.log( `Batsman-> ${batsmanName} Runs-> ${runs} balls-> ${balls} fours-> ${fours} sixes-> ${sixes} SR-> ${strikeRate}`);
                if(batsmanName){
                    createLeaderBoard(batsmanName , runs , balls , fours , sixes , teamName);
                }
                // if(batsmanName)
                // console.log("------------------------------------------------------");
            }
        }
    }
}
}

function createLeaderBoard(batsmanName , runs , balls , fours , sixes , teamName){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    for(let i=0 ; i<leaderBoard.length ; i++){
        if(leaderBoard[i].Name == batsmanName && leaderBoard[i].Team == teamName){
            leaderBoard[i].Runs += runs;
            leaderBoard[i].Balls += balls;
            leaderBoard[i].Fours += fours;
            leaderBoard[i].sixes += sixes;
            return;
        }
    }
    let entry = {
        Team : teamName,
        Name : batsmanName,
        Runs : runs , 
        Balls : balls,
        Fours : fours , 
        Sixes : sixes
    };
    leaderBoard.push(entry);
}


module.exports = findDetails;