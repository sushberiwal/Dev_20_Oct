let fs = require("fs");

// sync code => top to bottom and left to right
// async => 

console.log("Before");


// web data
let f1KaData = fs.readFileSync("./f1.txt");  // 100gb
console.log("Content "+ f1KaData);


console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");
console.log("After");