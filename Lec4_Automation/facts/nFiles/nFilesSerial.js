let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


let f1KaPromise = fs.promises.readFile(files[0]);

for(let i=1 ; i<files.length ; i++){
    f1KaPromise = f1KaPromise.then(function(data){
        console.log("Content = " + data);
        let nextFileKaPromise = fs.promises.readFile(files[i]);
        return nextFileKaPromise;
    })
}

f1KaPromise.then(function(data){
    console.log("Content " + data);
})
