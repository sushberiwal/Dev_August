let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

const allMatches = require("./allMatches");


request( "https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup " , callback );

function callback( error , response , data ){
    //succesfull data received
    if(error == null && response.statusCode == 200){
        parseData(data);
    }
    // page not found
    else if(response.statusCode == 404){
        console.log("page Not found !!!!");
    }    
    // error occured
    else{
        console.log(response);
        console.log(error);
    }
}


function parseData(data){
    let ch = cheerio.load(data);
    let link = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com"+link;
    
    allMatches(completeLink);
}

