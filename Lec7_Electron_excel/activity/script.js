// npm install jquery
// sudo npm install jquery
let $ = require("jquery");


$(document).ready(function(){
    
    console.log("jquery is loaded");

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
})