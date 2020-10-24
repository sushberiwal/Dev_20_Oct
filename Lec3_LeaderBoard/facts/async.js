let fs = require("fs");

// sync code => top to bottom and left to right
// async => javascript => sync lang => async with the help of callbacks

console.log("Before");

fs.readFile("./f1.txt" , cb); // start reading file

function cb(error , data){
    console.log("Content "+ data);
}


console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");



while(true){
// infinite loop
}



