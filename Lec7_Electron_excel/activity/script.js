// npm install jquery
// sudo npm install jquery
let $ = require("jquery");


$(document).ready(function(){

    let db;
    // event attach cell => click 
    $("#cells #cell").on("click" , function(){
        let rowId = Number($(this).attr("r-id"));
        let colId = Number($(this).attr("c-id"));
        // A1 // B2
        let address =  String.fromCharCode(colId+65) + (rowId+1);
        // console.log(address);
        // console.log(rowId , colId);
        $("#address").val(address);
    })
    $("#cells #cell").on("blur" , function(){
        let value = $(this).text();
        let rowId = Number($(this).attr("r-id"));
        let colId = Number($(this).attr("c-id"));
        db[rowId][colId].value = value;
        console.log(db); 
    })


    function init(){
        db=[];
        let allRows = $("#cells").find(".row"); 
        for(let i=0 ; i<allRows.length ; i++){
            let row=[];
            let allCols = $(allRows[i]).find(".cell");
            for(let j=0 ; j<allCols.length ; j++){
                let cellObject = {
                    value:"",
                    formula:""
                }
                row.push(cellObject);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();





})