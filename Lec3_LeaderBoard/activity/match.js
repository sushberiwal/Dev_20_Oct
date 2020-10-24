// ek match ki details nikalana
let cheerio = require("cheerio");
const request = require("request");
let fs = require("fs");

let leaderboard = [];

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
                    createLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes);
                }
            }
        }
    }
    console.log("###########################################");
}


function createLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes ){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Batsman == batsmanName && leaderboard[i].Team == teamName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }
    
    let entry = {
        Team : teamName ,
        Batsman : batsmanName ,
        Balls : balls,
        Runs : runs ,
        Fours : fours,
        Sixes : sixes
    }
    leaderboard.push(entry);
}



module.exports = getMatch;