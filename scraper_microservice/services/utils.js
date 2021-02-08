function concatObjectsKeyValue(obj) {
    var strArray = []; //new Array
    for (var prop in obj) {
        strArray.push(prop + ": " + obj[prop]);
    }
    return strArray.join("\n ");
}

module.exports = {concatObjectsKeyValue};