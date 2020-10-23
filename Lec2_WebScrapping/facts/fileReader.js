// fs module => file system => file system 
let fs = require("fs");
let cheerio = require("cheerio");

let f1KaData = fs.readFileSync("./f1.txt" ,"utf-8" );

// console.log(f1KaData);

let htmlkaData = fs.readFileSync("./index.html");


let ch = cheerio.load(htmlkaData);

let h1KaData = ch("h1").text();
// <h1> heading 1</h1>
// console.log(h1KaData);

// let pkaData = ch("p").text();
// [  <p>askjdbajksdb </p>  , <p> aklsnfkjasb</p>    ]
// console.log(pkaData);

// let pKaData = ch(".pa.outer").text();
// console.log(pKaData);
let pKaData = ch("ul .pa").text();
// console.log(pKaData);

let hKaData = ch("#unique").text();
console.log(hKaData);


