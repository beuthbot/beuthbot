const request = require('request');
const x = require('x-ray')()
const fs = require('fs')
const tableScraper = require('table-scraper');
const tabletojson = require('tabletojson').Tabletojson;
/**
 * Scrape an Ul-elemenent and return its result as an Array
 * @param url
 * @param WrappingElementId String - id of wrapping element
 * @param headerElement     String - tag or id of element that gives the value to the header-key of returning Array
 * @param listTag           String - the tag surrounding the list elements (e.g. 'ul')
 * @param listElemTag       String - the Lists elements tag  (e.g. 'li')
 * @param regExpListTitle   String - the regExp-pattern for the tittle of the ul-element
 * @param regExpListElement String - the regExp-pattern for the li-elements of the ul-element
 * @param listElementKey    String - the key that each li-element shall have
 * @param callback          Function - returns the scraped list-Array
 */

async function list(url,WrappingElementId,headerElement,listTag, ListElemTag,regExpListTitlePattern,regExpListElementPattern,listElementKey)  {
    let list = [];
    await x(url, WrappingElementId, (headerElement)
    ).then(function (res) {
        let appTime = {"header": res}
        list.push(appTime)
    })
    let resultList = await x(url, WrappingElementId, (listTag, [ListElemTag])
        ).then(function ( results) {
            results.forEach(function (result, index) {
                let regExpListTitle = new RegExp(regExpListTitlePattern);
                let regExpListElement = new RegExp(regExpListElementPattern);
                let listTitle = result.match(regExpListTitle)
                let listElem = result.match(regExpListElement)
                if (listTitle)
                    title = listTitle[0]
                if (listElem)
                    listElement = listElem[0]
                if (listTitle && listElem) {
                    let appTime = {"title": title, [listElementKey]: listElement}
                    list.push(appTime)
                }
            })
        return list
    })
    console.log(" - DONE SCRAPING - ")
    console.log(" - DONE SCRAPING - resultList: ",resultList)
    return resultList
}

/**
 *
 * Downloads chosen tags with chosen fileformat
 * saves them with chosen title appended by the files index
 *
 * @param url
 * @param tagOrSelector - for example 'img'
 * @param filterAttribute - such as 'alt' or 'class'
 * @param filterAttributeValue - the value of the attribute we look for
 * @param name - the value of the attribute we look for
 */
function download(url,tagOrSelector,filterAttribute,filterAttributeValue,fileformat,title) {
    x(url, tagOrSelector, [{
        [filterAttribute]: '@' + [filterAttribute],
        class: '@class',
        alt: '@alt',
        src: '@src'
    }])
    (function (err, results) {
        results = results.filter(function (result) {
            if (result[filterAttribute]) {
                return result[filterAttribute].includes(filterAttributeValue)
            }
        }).forEach(function (result, index) {
            //request(result[filterAttribute]).pipe(fs.createWriteStream(index + '.jpg'))
            request(result.src).pipe(fs.createWriteStream(title + index + fileformat))
        })
    });
    console.log(" - DONE SCRAPING - ")
}

/**
 *  Converts all tables of an URL into a JSON-file
 * @param url
 * @param filename
 */
function allTablesToJson(url,filename) {
    tableScraper
        .get(url)
        .then(function (tableData) {
            fs.writeFile(filename + '.json', JSON.stringify(tableData), 'utf8', () => console.log(" - DONE SCRAPING - "));
        })
}

/**
 *  Converts all tables of an URL into a JS-Object
 * @param url
 * @param filename
 */
async function allTablesToObject(url,filename) {
    try {
        return  await tableScraper
            .get(url)
            .then(function (tableData) {
                return tableData
            })
    }
    catch(e){
        return "failed allTablesToJson"
    }
}

/**
 * Converts a single table of an URL into a JSON-file
 * @param url
 * @param filename
 * @param index
 */
function tableToJson(url,filename,index) {
    tableScraper
        .get(url)
        .then(function (tableData) {
            fs.writeFile(filename + '.json', JSON.stringify(tableData[index]), 'utf8', () => console.log(" - DONE SCRAPING - "));
        })
}

module.exports = {tableToJson,allTablesToJson,allTablesToObject,download,list ,tabletojson};
