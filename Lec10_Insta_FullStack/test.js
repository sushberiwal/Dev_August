let usersDb = [
  { id: 1, name: "sushant" },
  { id: 2, name: "lakshita" },
  { id: 3, name: "shivam" },
];


let id = 2;

let filteredArray = usersDb.filter(  function(obj){
    if(obj.id == id){
        return obj;
    }
});
    let user = filteredArray[0];
    console.log(user);

    