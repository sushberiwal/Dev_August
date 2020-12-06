let blocklist = [1 , 2 , 3 ,4  ,5];

blocklist = blocklist.filter( function(val){
    return val != 1;
});

console.log(blocklist);