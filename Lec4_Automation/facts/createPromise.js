let fs = require("fs");

// promisifed function => pending promise 
function myPromise(filePath){
    return new Promise( function( resolve , reject){
        fs.readFile(filePath , function(error ,data){
            if(error){
                reject("I am failed callback");
            }
            else{
                resolve(data);
            }
        })
    });
}

let pendingPromise = myPromise("./f1.txt");
console.log(pendingPromise);

// success callback
pendingPromise.then( function(data){
    console.log("inside then");
console.log("Content "+ data);
});

// failed callback
pendingPromise.catch( function(error){
    console.log(error);
});