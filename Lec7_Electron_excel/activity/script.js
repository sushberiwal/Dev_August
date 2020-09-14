// npm install jquery
// sudo npm install jquery
// cheerio 
let $ = require("jquery");
let fs = require('fs');
let dialog = require("electron").remote.dialog;
$(document).ready(function () {
  let db;
  let lsc;
  
  
  // DOM Events based functions
  
  // new - open - save
  $("#new").on("click" , function(){
    console.log("new clicked");
    // empty database is initialized
    db = [];
    let allRows = $("#cells").find(".row");
    for (let i = 0; i < allRows.length; i++) {
      let row = [];
      let allCols = $(allRows[i]).find(".cell");
      for (let j = 0; j < allCols.length; j++) {
        let name = String.fromCharCode(j + 65) + (i + 1);
        let cellObject = {
          name: name,
          value: "",
          formula: "",
          parents: [],
          childs: [],
        };
        row.push(cellObject);
        $(allCols[j]).html("");
      }
      db.push(row);
    }
    $("#address").val("");
    $("#formula-input").val("");
  })

  $("#open").on("click" , function(){
    console.log("clicked on open");
    // array of paths
     let paths = dialog.showOpenDialogSync();
     let path = paths[0];
    //  steps ??
    let data = fs.readFileSync(path);
    data = JSON.parse(data);
    db = data;
    // console.log(data);
    let allRows = $("#cells").find(".row");
    for(let i=0 ; i<allRows.length ; i++){
      let allCellsInARow = $(allRows[i]).find(".cell");
      for(let j=0 ; j<allCellsInARow.length ; j++){
        $(allCellsInARow[j]).html( db[i][j].value );
      }
    }

  })

  $("#save").on("click" , function(){
    console.log("clicked on save");
    let path = dialog.showSaveDialogSync();
    console.log(path);
    let data = JSON.stringify(db);
    fs.writeFileSync(path , data);
    alert("File Saved");
  })
  
 //Scrolling
 $(".content").on("scroll" , function(){
   let topOffset = $(this).scrollTop();
   let leftOffset = $(this).scrollLeft();
  //  console.log(`Top => ${topOffset}`);
  //  console.log(`Left => ${leftOffset}`);
   $("#top-row , #top-left-cell").css("top" , topOffset+"px");
   $("#left-col , #top-left-cell").css("left" , leftOffset+"px");

 })
 
 //keyup
 $("#cells #cell").on("keyup" , function(){
  // height of cell 
  let ht = $(this).height(); 
  let leftCellId = $(this).attr("r-id");
  let allLeftCells = $("#left-col .left-cell");
  let leftCell = allLeftCells[leftCellId];
   $(leftCell).height(ht);
 })


  $("#cells #cell").on("click", function () {
    let { rowId, colId } = getRowIdColId(this);
    // A1 // B2
    let address = String.fromCharCode(colId + 65) + (rowId + 1);
    $("#address").val(address);
    let formula = db[rowId][colId].formula;
    $("#formula-input").val(formula);
  });
  $("#formula-input").on("blur", function () {
    let formula = $(this).val();
    if(formula) {
      let {rowId , colId} = getRowIdColId(lsc);
      let cellObject = db[rowId][colId];
      let dbFormula = db[rowId][colId].formula;
      // dbFormula = ? " " , "akjsdbha";
      if( dbFormula != formula ){
        if(dbFormula){
          removeFormula();
        }
          addFormula(formula);
          updateChildrens(cellObject);
      }
    }
    // console.log(db);
  });
  $("#cells #cell").on("blur", function () {
    // set last selected cell to this
    lsc = this;
    
    // value from the UI cell
    let value = $(this).text();
    // rowId and colId of cell
    let { rowId, colId } = getRowIdColId(this);
    // value = value
    // formula = value
    if(value != db[rowId][colId].value ){
      if(db[rowId][colId].formula){
        removeFormula();
        $("#formula-input").val("");
      }

      // update cellobject value in db
      db[rowId][colId].value = value;
      let cellObject = db[rowId][colId];
      updateChildrens(cellObject);
    }
  });


  // functions 
  function updateChildrens(cellObject){
    console.log("i am inside update childrens");
    for(let i=0 ; i<cellObject.childs.length ; i++){
      // cellObject.childs = ["B1" , "C1"];
      // A1 + A2;
      let childName = cellObject.childs[i];
      console.log("Child Name" , childName);
      let {rowId , colId} = getRowAndColFromAddress(childName);
      let childObject = db[rowId][colId];
      let newValue = solveFormula(childObject.formula);
      console.log("NEW Value" , newValue);
      childObject.value = newValue;
      $(`#cells #cell[r-id=${rowId}][c-id=${colId}]`).html(newValue);
      console.log(childObject);
      updateChildrens(childObject);
    }
  }
  function removeFormula(){
    // value , formula , parents
    // loop on parents
    // remove yourself from parents childrens
    let {rowId , colId} = getRowIdColId(lsc);
    let cellObj = db[rowId][colId];
    let toBeRemoved = cellObj.name;
    let parents = cellObj.parents;
    for(let i=0 ; i<parents.length ; i++){
      //["A1" , "A2"]
      let {rowId , colId} = getRowAndColFromAddress(parents[i]);
      let parentCellObject = db[rowId][colId];
      let childs = parentCellObject.childs;
      let filteredArray = childs.filter( function(elem){
        return elem != toBeRemoved; 
      });
      parentCellObject.childs = filteredArray;
    } 
    cellObj.value="";
    cellObj.formula="";
    cellObj.parents = [];
  }
  function getParents(formula) {
    // ( B1 * 10 );
    let parents = [];
    // formula => ( A1 + A2 )
    let splitedFormula = formula.split(" ");
    //["(" , "A1" , "+" , "A2" , ")"];
    //["(" , "B1" , "*" , "10" , ")"];
    for (let i = 0; i < splitedFormula.length; i++) {
      let fComp = splitedFormula[i];
      let character = fComp[0];
      if (character >= "A" && character <= "Z") {
        parents.push(fComp);
      }
    }
    console.log(parents);
    return parents;
  }
  function addSelfToChildsOfParents(cellObj){
      for(let i=0 ; i<cellObj.parents.length ; i++){
          let addressOfParent = cellObj.parents[i];
          //A1 => (0,0)
          let {rowId,colId} = getRowAndColFromAddress(addressOfParent);
          let parentCellObj = db[rowId][colId];
          parentCellObj.childs.push(cellObj.name);
      }
  }
  function solveFormula(formula){
    // ( A1 + A2 ) => ( 10 + 20 );
    let splitedFormula = formula.split(" ");
    //["(" , "A1" , "+" , "A2" , ")"]
    for (let i = 0; i < splitedFormula.length; i++) {
      let fComp = splitedFormula[i];
      let character = fComp[0];
      if (character >= "A" && character <= "Z") {
        let {rowId , colId} = getRowAndColFromAddress(fComp);
        let value = db[rowId][colId].value;
        // console.log(value);
        formula = formula.replace(fComp , value);
        // console.log(formula); 
      }
    }
    // console.log(formula);
    let val = eval(formula);
    return val;
  }
  function addFormula(formula) {
    let { rowId, colId } = getRowIdColId(lsc);
    let cellObj = db[rowId][colId];
    //update cellobject formula with this formula
    cellObj.formula = formula;
    //update parents of cellobject
    let parents = getParents(formula);
    for (let i = 0; i < parents.length; i++) {
      cellObj.parents.push(parents[i]);
    }
    //goto parent cell object and add self to their childs array
    addSelfToChildsOfParents(cellObj);

    //set value in db as well as ui
    let value = solveFormula(formula);
    cellObj.value = value;
    $(lsc).html(value);
  }

  //Utility functions
  //get rowId and colId from attributes
  function getRowIdColId(elem) {
    let rowId = Number($(elem).attr("r-id"));
    let colId = Number($(elem).attr("c-id"));
    return {
      rowId: rowId,
      colId: colId,
    };
  }
  //get rowId and colId from address
  function getRowAndColFromAddress(address){
    let colId = address.charCodeAt(0)-65;
    let rowId = address[1]-1;
    return {
        rowId:rowId,
        colId:colId
    }
  }
  // initialize the db
  function init() {
    $("#new").trigger("click");
    // console.log(db);
  }
  init();
});
