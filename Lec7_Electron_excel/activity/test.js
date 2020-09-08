let formula = "( A1 + A2 )";
let splitedFormula = formula.split(" ");
//["(" , "A1" , "+" , "A2" , ")"]
for (let i = 0; i < splitedFormula.length; i++) {
  let fComp = splitedFormula[i];
  let character = fComp[0];
  if (character >= "A" && character <= "Z") {
    // let {rowId , colId} = getRowAndColFromAddress(fComp);
    let value = 10;
    formula = formula.replace(fComp , value); 
  }
}

// console.log(formula);


let toBeRemoved = "B2";
let array = ["A1" , "B2" , "C6" , "A10"];


let filteredArray = array.filter( function(elem){
    return elem != toBeRemoved;
});
console.log(array);
console.log(filteredArray);