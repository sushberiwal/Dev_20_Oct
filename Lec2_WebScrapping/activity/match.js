// ek match ki details nikalana
let cheerio = require("cheerio");
const request = require("request");
let fs = require("fs");


// let link = "https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019";


function getMatch(link){
    request(link , cb);
}


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
    let ch = cheerio.load(html);
    let bothInnings =ch(".card.content-block.match-scorecard-table .Collapsible");
    // [ <div class="Collapsible"> </div>  ,<div class="Collapsible"> </div>  ];
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("Innings")[0].trim();
        // console.log(teamName);

        if(!teamName.includes("Team")){
            let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
            // [ <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr>];
            for(let j=0 ; j<allTrs.length-1 ; j++){
                let allTds = ch(allTrs[j]).find("td");
                // [ <td> </td>  , <td> </td> ] //  [ <td> </td> ];
                if(allTds.length > 1){
                    let batsmanName = ch(allTds[0]).find("a").text().trim();
                    let runs = ch(allTds[2]).text().trim();
                    let balls = ch(allTds[3]).text().trim();
                    let fours = ch(allTds[5]).text().trim();
                    let sixes = ch(allTds[6]).text().trim();
                    let strikeRate = ch(allTds[7]).text().trim();
                    // string interpolation
                    // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                    processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
                }
            }
        }
    }
    console.log("###########################################");
}



function checkTeamFolder(teamName){
    // check folder exists or not
    return fs.existsSync(teamName)
}
function createTeamFolder(teamName){
    //teamName = India
    fs.mkdirSync(teamName);
}
function checkBatsmanFile(teamName  , batsmanName){
    // teamName = India
    // batsman = MSDhoni
    // batsmanPath = "India/MSDhoni.json" // javascript object notation
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    // stringified => original form
    batsmanFile = JSON.parse(batsmanFile);
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        SR : strikeRate
    }
    batsmanFile.push(inning);
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath , batsmanFile);
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let batsmanFile =[];
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        SR : strikeRate
    }
    batsmanFile.push(inning);
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath , batsmanFile);
}


function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    // check if team folder exist ?
    let isTeamFolder = checkTeamFolder(teamName);
    if(isTeamFolder){
        let isBatsman = checkBatsmanFile(teamName , batsmanName);
        if(isBatsman){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}


module.exports = getMatch;