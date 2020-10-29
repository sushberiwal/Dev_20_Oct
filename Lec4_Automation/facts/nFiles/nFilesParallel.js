let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


// parallely , loops , promises


for(let i=0 ; i<files.length ; i++){
    let fileKaPromise = fs.promises.readFile(files[i]);
    fileKaPromise.then(function(data){
        console.log("Content of FIle = " + data);
    })
}