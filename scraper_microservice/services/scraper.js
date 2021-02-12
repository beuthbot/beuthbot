const profsUrl = 'https://www.beuth-hochschule.de/people';
const terminUrl = "https://www.beuth-hochschule.de/termine"
const universalScraper = require('./universalScraper');
const utils = require('./utils');
const fs = require('fs');
const x = require('x-ray')()
const request = require('request');
const axios = require('axios').default;
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true });
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
    return result
}
async function belegFrist(){
    let result
    await universalScraper.list(terminUrl,'#c2359','h4','ul','li','.+?(?=[\t])','[0-9].+[.].+','time')
        .then(function (data) {
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

// Profs
function updateProfessors(){
    universalScraper.allTablesToJson(profsUrl,'allProfs')
}
async function getProfessors(){
    return  universalScraper.allTablesToObject(profsUrl,'allProfs')
}

function getProfFromJSON(name){
    updateProfessors();
    // let index = name.toLowerCase().charCodeAt(0) - 96
    let rawdata = fs.readFileSync('allProfs.json');
    let allProfs = JSON.parse(rawdata);
    // set first letter to uppercase
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let startingLetter = name[0]
    let index = allProfs.findIndex(e => e[0].Name[0] == startingLetter);

    let searchedProf = allProfs[index].find(e => e.Name.startsWith(name))

    return utils.concatObjectsKeyValue(searchedProf)
}

async function getProf(name){
    // let index = name.toLowerCase().charCodeAt(0) - 96
    try {
        return getProfessors().then(function (allProfs) {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            let startingLetter = name[0]
            let index = allProfs.findIndex(e => e[0].Name[0] == startingLetter);
            let searchedProf = allProfs[index].find(e => e.Name.startsWith(name))

            return utils.concatObjectsKeyValue(searchedProf)
        })
    }
    catch(e){
        return "error in scraper.getProf" + e
    }
}

async function getProfessorsPagesList(url) {
    try {
        let prof = {}
        let profLinks = []


        const profPages = await new Promise(function(resolve, reject) {

            axios.get(url).then(resp => {
                let body = resp.data
                let regexLink = /\"(.*?)\"/g
                let regexName = /\<(.*?)\>/g
                let containsNumbers = /\d+/g
                x(body, ['table@html'])(function (conversionError, tableHtmlList) {
                    if (conversionError) {
                        return reject(conversionError);
                    }
                    tableHtmlList.map(function (table) {
                        x(table, 'tbody', ["td@html"])(function (err, td) {
                            if (err) console.log("err in tableHtmlList", err)

                            td.forEach(function (item, index) { // tdo
                                utils.handleUmlaute(item).then(function (elem) {
                                    let potentialName = elem.replace(regexName, "").replace("/\n/g").replace(/\s/g, '');
                                    let match = regexLink.exec(elem)

                                    if (!containsNumbers.test(potentialName))
                                        if (match)
                                            if (match.length > 0)
                                                if (match[1].startsWith("/people")) {
                                                    profLinks.push({name:potentialName.toLowerCase().replace("'","").split(",")[0],link:'https://www.beuth-hochschule.de'+ match[1]})
                                                }
                                })
                                if(index == td.length-1)resolve(profLinks)
                            });
                        })
                    })
                })
            }).catch(error => {
                console.log("axios call failed in Scraper getProfessorsPagesList() : ",error)
            });
            return "done"
        })
        return profPages
    } catch (error) {
    }
}
async function profListToJSON(url){
    getProfessorsPagesList(url).then(function(resultProf){
        fs.writeFile("profLinks" + '.json', JSON.stringify(resultProf), 'utf8', () => console.log(" - DONE SCRAPING - "));
    })
}
async function getProfFromJson(name){
    let rawdata = fs.readFileSync('profLinks.json');
    let profLinks = JSON.parse(rawdata);
    let searchedProfLink;
    let wholeName = ""
    let link = ""
    for (let i = 0, len = profLinks.length; i < len; i++) {
        if(profLinks[i].name.toLowerCase().replace("'","").split(",")[0] == name.toLowerCase()){
            searchedProfLink = profLinks[i].link
            wholeName = profLinks[i].name
        }
    }
    if(searchedProfLink) {
        const result = await new Promise(function (resolve, reject) {
            axios.get(searchedProfLink).then(resp => {
                let body = resp.data
                x(body, ['table@html'])(function (conversionError, tableHtmlList) {
                    if (conversionError) {
                        return reject(conversionError);
                    }
                    let foundProf = tableHtmlList.map(function (table) {
                        return universalScraper.tabletojson.convert('<table>' + table + '</table>')[0];
                    })
                    foundProf[0].unshift({"0":"Name:","1":wholeName})
                    foundProf[0].push({"0":"Link:","1":searchedProfLink})
                    resolve(foundProf);
                    setTimeout(()=>{profListToJSON("https://www.beuth-hochschule.de/people")},1000)
                });
            }).catch(error => {
                resolve(getProfFromJson(name))
            });
        })
        return utils.formatProf(result[0])
    }else return "Es konnte kein/e Professor/in mit diesem Namen gefunden werden."
}



module.exports = {bewerbungsFristenBachelor,bewerbungsFristenMaster,belegFrist,vorlesungsZeiten,beurlaubungFrist,getProfFromJson}