let request = require("request");
let cheerio = require("cheerio");
const fs  = require("fs");
let path = require("path");

  function findDetails(link){
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
let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");

for(let i=0 ; i<bothInnings.length ; i++){
    let teamName = ch(bothInnings[i]).find(".header-title.label").text();
    teamName = teamName.split("Innings")[0].trim();
    console.log(teamName);
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
            processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            console.log("------------------------------------------------------");
        }
    }
}

}

function checkTeamFolder(teamName){
    if(fs.existsSync(teamName)){
        return true;
    }
    else{
        return false;
    }
}
function checkBatsmanFile(teamName , batsmanName){
    let bPath = path.join(teamName,batsmanName+".json");
    // India/V_Kohli.json
    if(  fs.existsSync(bPath)){
        return true;
    }
    else{
        return false;
    }
}
function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let bPath = path.join(teamName,batsmanName+".json");
    //India/V Kohli.json
    let data = [];
    let obj = {
        runs:runs,
        balls:balls,
        fours : fours,
        sixes : sixes,
        SR : strikeRate
    }
    data.push(obj);
    data = JSON.stringify(data);
    fs.writeFileSync(bPath , data);
}
function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let bPath = path.join(teamName,batsmanName+".json");
    let data = fs.readFileSync(bPath);

    data = JSON.parse(data);
    let obj = {
        runs:runs,
        balls:balls,
        fours : fours,
        sixes : sixes,
        SR : strikeRate
    }
    data.push(obj);
    data = JSON.stringify(data);
    fs.writeFileSync(bPath , data);
}
function createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}
function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    //teamFolder exists ?
    let teamFolderExists = checkTeamFolder(teamName);
    //yes
    if(teamFolderExists == true){
        let batsmanExists = checkBatsmanFile(teamName , batsmanName);
        //yes
        if(batsmanExists == true){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        //not exists
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    //no
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}


module.exports = findDetails;