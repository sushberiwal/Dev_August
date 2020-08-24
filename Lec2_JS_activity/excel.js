const xlsx = require("xlsx");
const fs = require("fs")
var rawFile = fs.readFileSync("./activity/India/V Kohli.json")//dir of your json file as param

var raw = JSON.parse(rawFile)

// var files  = []
// for (each in raw){
//     files.push(raw[each])
//     }  
//    var obj = raw.map((e) =>{
//         return e;
//        })
//        console.log(obj);

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(raw)
xlsx.utils.book_append_sheet( newWB , newWS , "name" ) //workbook name as param
xlsx.writeFile(newWB,"Sample-Sales-Data.xlsx") //file name as param
   