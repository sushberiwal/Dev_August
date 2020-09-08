// npm install jquery
// sudo npm install jquery
let $ = require("jquery");
$(document).ready(function () {
  let db;
  let lsc;
  // event attach on cell => click
  $("#cells #cell").on("click", function () {
    let { rowId, colId } = getRowIdColId(this);
    // A1 // B2
    let address = String.fromCharCode(colId + 65) + (rowId + 1);
    $("#address").val(address);
  });

  $("#formula-input").on("blur", function () {
    let formula = $(this).val();
    if (formula) {
      addFormula(formula);
    }
    $(this).val("");
    console.log(db);
  });

  $("#cells #cell").on("blur", function () {
    let value = $(this).text();
    let { rowId, colId } = getRowIdColId(this);
    db[rowId][colId].value = value;
    // console.log(db);
    lsc = this;
  });

  function getParents(formula) {
    let parents = [];
    // formula => ( A1 + A2 )
    let splitedFormula = formula.split(" ");
    //["(" , "A1" , "+" , "A2" , ")"]
    for (let i = 0; i < splitedFormula.length; i++) {
      let fComp = splitedFormula[i];
      let character = fComp[0];
      if (character >= "A" && character <= "Z") {
        parents.push(fComp);
      }
    }
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
  }

  //return rowId and colId from attributes
  function getRowIdColId(elem) {
    let rowId = Number($(elem).attr("r-id"));
    let colId = Number($(elem).attr("c-id"));
    return {
      rowId: rowId,
      colId: colId,
    };
  }

  function getRowAndColFromAddress(address){
    let colId = address.charCodeAt(0)-65;
    let rowId = address[1]-1;
    return {
        rowId:rowId,
        colId:colId
    }
  }

  function init() {
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
      }
      db.push(row);
    }
    // console.log(db);
  }
  init();
});
