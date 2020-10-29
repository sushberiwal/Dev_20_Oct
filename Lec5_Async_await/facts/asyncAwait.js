// await keyword needs a async function
// function => IIFE 
// Immediately invoked function expression

let fs = require("fs");


console.log("start");


(async function(){
    try{
        let f1KaPromise = fs.promises.readFile("./f1.txt");
        let f2KaPromise = fs.promises.readFile("./f2.txt");
        // console.log(f1KaPromise , f2KaPromise);
        let bothData = await Promise.all( [ f1KaPromise  , f2KaPromise ]);
        console.log(bothData);
    }
    catch(error){
    }
})();



console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");


