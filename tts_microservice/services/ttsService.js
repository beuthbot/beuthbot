const gTTS  = require("gtts");

/**
 *
 * @param textToSpeak - String text, that shall be converted to audioFile
 * @param fileName    - String name of the file
 * @param format      - String 'mp3' / 'wav' / 'ogg'
 */
 async function convertTextToSpeech(textToSpeak,fileName,format,language,callback){

    let gtts = new gTTS(textToSpeak, language);
    let path = fileName +"."+ format

    gtts.save(path, callback)
}

function convertTextToSpeechStream(textToSpeak,language,res){
    let gtts = new gTTS(textToSpeak, language);
    gtts.stream().pipe(res);
}

module.exports = {gTTS,convertTextToSpeech,convertTextToSpeechStream};
