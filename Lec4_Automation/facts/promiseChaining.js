// async // promises // parallely

let fs = require("fs");
     // 2k
let f1KaPromise = fs.promises.readFile("./f1.txt");
    
//10k => pending            //2k.then
let thenKaPromise =  f1KaPromise.then(function (data) {
  console.log("Content " + data);
})
thenKaPromise.then(function(){
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function (data) {
  console.log("Content " + data);
})
.then(function(){
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function (data) {
  console.log("Content " + data);
});
