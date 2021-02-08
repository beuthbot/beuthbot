
const url = 'https://www.beuth-hochschule.de/people';
const imgUrl = 'https://medium.com/@stefanhyltoft/scraping-html-tables-with-nodejs-request-and-cheerio-e3c6334f661b'
const terminUrl = "https://www.beuth-hochschule.de/termine"
//const universalScraper = require('../../universalScraper/universalScraper'); // cannot be found in docker
const universalScraper = require('./universalScraper');
const fs = require('fs');

// Termine
async function bewerbungsFristenBachelor(){
    let result
    await universalScraper.list(terminUrl,'#c13676','header','ul','li','.+?(?=[\t])','[0-9].+[.].+','time')
        .then(function (data) {
            let resultString = data[0].header + "\n\n" + "Sommersemester: \n" +
                data[1].title + data[1].time + "\n" +
                data[2].title + data[2].time + "\n\n" +  "Wintersemester: \n" +
                data[3].title + data[3].time + "\n" +
                data[4].title + data[4].time + "\n"

            result =  resultString
        })
        .catch(function (e) {
            console.log(e)
        });
    return result
}
async function bewerbungsFristenMaster(){
    let result
    await universalScraper.list(terminUrl,'#c13672','header','ul','li','.+?(?=[\t])','[0-9].+[.].+','time')
        .then(function (data) {

            let resultString = data[0].header + "\n\n" + "Sommersemester: \n" +
                data[1].title + data[1].time + "\n\n" +  "Wintersemester: \n" +
                data[2].title + data[2].time

            result = resultString
        })
        .catch(function (e) {
            console.log(e)
        });
    console.log(result)
    return result
}
async function belegFrist(){
    let result
    await universalScraper.list(terminUrl,'#c2359','h4','ul','li','.+?(?=[\t])','[0-9].+[.].+','time')
        .then(function (data) {
            console.log("data",data)
            let resultString = data[0].header.trim(data[0].header.replace(/[\t\n]+/g,' ')) + "\n\n"  +
                data[1].title + data[1].time + "\n" +
                data[2].title + data[2].time + "\n" +
                data[3].title + data[3].time

            result = resultString
        })
        .catch(function (e) {
            console.log(e)
        });
    return result
}
async function vorlesungsZeiten(){
    let result
    await universalScraper.list(terminUrl,'#c21439','h4','ul','li','.+?(?=[\t])','[0-9].+[.].+','time')
        .then(function (data) {
            let times = data[1].time.split(/(.*?nge)/).filter(e =>  e);

            let resultString = data[0].header.trim(data[0].header.replace(/[\t\n]+/g,' ')) + "\n\n"  +
                data[1].title + "\n" +
                times[0] + "\n" +
                times[1] + "\n" +
                times[2]

            result = resultString
        })
        .catch(function (e) {
            console.log(e)
        });
    return result
}
async function beurlaubungFrist(){
    let result
    await universalScraper.list(terminUrl,'#c15469','','ul','li','/.*/','/.*/','time')
        .then(function (data) {
            let times =  data[0].header.split(/(.*?zeit)/).filter(e =>  e)
            let resultString = times[0] + " \n " +
                               times[1] + " \n "

            result = resultString
        })
        .catch(function (e) {
            console.log(e)
        });
    return result
}

//bewerbungsFristenBachelor()
//belegFrist()
//vorlesungsZeiten()
//beurlaubungFrist()

// Profs
function updateProfessors(){
    universalScraper.allTablesToJson("https://www.beuth-hochschule.de/people",'allProfs')
}

async function getProfessors(){
    return  universalScraper.allTablesToObject("https://www.beuth-hochschule.de/people",'allProfs')
}

function prof(name){
    updateProfessors();
    // let index = name.toLowerCase().charCodeAt(0) - 96
    let rawdata = fs.readFileSync('allProfs.json');
    let allProfs = JSON.parse(rawdata);
    // set first letter to uppercase
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let startingLetter = name[0]
    let index = allProfs.findIndex(e => e[0].Name[0] == startingLetter);

    let searchedProf = allProfs[index].find(e => e.Name.startsWith(name))

    return searchedProf
}

async function getProf(name){
    // let index = name.toLowerCase().charCodeAt(0) - 96
    try {
        return getProfessors().then(function (allProfs) {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            let startingLetter = name[0]
            let index = allProfs.findIndex(e => e[0].Name[0] == startingLetter);
            let searchedProf = allProfs[index].find(e => e.Name.startsWith(name))

            return searchedProf
        })
    }
    catch(e){
        return "error in scraper.getProf" + e
    }
}

// updateProfessors()
//getProf("ziemer")

module.exports = {bewerbungsFristenBachelor,bewerbungsFristenMaster,belegFrist,vorlesungsZeiten,beurlaubungFrist,updateProfessors,prof,getProf}