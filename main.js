let req = require("request");
let ch = require("cheerio");
let AllMatch = require("./AllMatch.js");
// const { match } = require("assert");
let URL = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595';
req(URL, cb);

function cb(error, response, data) {
    if (response.statusCode == 404) {
        console.log("Page Not Found");
    } else if (response.statusCode == 200) {
        parseHTML_(data);
    } else console.log(error);
}

function parseHTML_(data) {
    let $ = ch.load(data);
    let AllMatchPageElem = $('a[data-hover="View All Results"]');
    let AllMatchPageURL = AllMatchPageElem.attr("href");
    AllMatchPageURL = "https://www.espncricinfo.com/" + AllMatchPageURL;
    AllMatch.getScoreCardURL(AllMatchPageURL);
}