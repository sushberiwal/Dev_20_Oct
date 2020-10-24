// npm install request
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

let link = "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup";
request(link , cb);

function cb(error , response , html){
    if(error == null && response.statusCode == 200){
        parseData(html);
    }
    else if(response.statusCode == 404){
        console.log("Page not found");
    }
    else{
        console.log(error);
    }
}


function parseData(html){
    // fs.writeFileSync("./home.html" , html);
    let ch = cheerio.load(html);
    let aTag = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com"+aTag;
    getAllMatches(completeLink);
}

// all matches ki link nikal dega