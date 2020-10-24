let fs = require("fs");


let pendingPromise = fs.promises.readFile("./f1.txt");
console.log(pendingPromise);


// success callback
pendingPromise.then( function(data){
console.log("Content "+ data);
});

// failed callback
pendingPromise.catch(function(error){
    console.log(error);
});