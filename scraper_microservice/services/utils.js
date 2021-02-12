function concatObjectsKeyValue(obj) {
    var strArray = []; //new Array
    for (var prop in obj) {
        strArray.push(prop + ": " + obj[prop]);
    }
    return strArray.join("\n ");
}
async function handleUmlaute(str) {
    str = str.replace(/&#214;|&#xD6;|&Ouml;/g, "Ö")
    str = str.replace(/&#228;|&#xE4;|&auml;/g, "ä")
    str = str.replace(/&#196;|&#xC4;|&Auml;/g, "Ä")
    str = str.replace(/&#252;|&#xFC;|&uuml;/g, "ü")
    str = str.replace(/&#220;|&#xDC;|&Uuml;/g, "Ü")
    str = str.replace(/&#xF6;|&#246;|&ouml;/g, "ö");
    return str
}

function formatProf(unformattedProf){
    let resultString = ""
    for(let i=0;i<unformattedProf.length;i++){
        resultString = resultString + Object.values(unformattedProf[i]).toString().replace(","," ").replace("[at]","@")
        if(unformattedProf[i+1]) resultString = resultString +" \n "
    }
    return resultString
}
module.exports = {concatObjectsKeyValue,handleUmlaute,formatProf};