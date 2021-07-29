let req = require("request");
let ch = require("cheerio");
let match = require("./Match.js");
// const { match } = require("assert");
function getScoreCardURL(URL) {
    req(URL, cb);
}
function cb(error, response, data) {
    if (response.statusCode == 404) {
        console.log("Page Not Found");
    }
    else if (response.statusCode == 200) {
        parseHTML_(data);
    }
    else console.log(error);
}
function parseHTML_(data) {
    let $ = ch.load(data);
    let allScorecardElems = $('a[data-hover="Scorecard"]');
    for (let i = 0; i < allScorecardElems.length; i++) {
        let matchURL = $(allScorecardElems[i]).attr("href");
        matchURL = "https://www.espncricinfo.com/" + matchURL;
        match.processMatch(matchURL, i + 1);
    }
}

module.exports = {
    getScoreCardURL: getScoreCardURL
}
