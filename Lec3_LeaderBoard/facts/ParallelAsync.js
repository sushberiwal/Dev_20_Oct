// async tasks , teen file , parallely read files

let fs = require("fs");

console.log("Before");


fs.readFile("./f1.txt" , function cb(error , data){
    console.log("Content "+ data);
}); 
fs.readFile("./f2.txt" , function cb(error , data){
    console.log("Content "+ data);
});
fs.readFile("./f3.txt" , function cb(error , data){
    console.log("Content "+ data);
});



console.log("After");




