const say = require("say");
// textToSpeak = "Willkommen beim Beut Bott! Hier erhalten Sie Informationen ueber blablabla"
//saytext = say.speak(textToSpeak)
// Export spoken audio to a WAV / MP3 file

/**
 *
 * @param textToSpeak - String text, that shall be converted to audioFile
 * @param fileName    - String name of the file
 * @param format      - String 'mp3' or 'wav'
 */
async function convertTextToSpeech(textToSpeak,fileName,format,callback){

    // say.export(textToSpeak, say.getInstalledVoices(), 1, fileName + "." + format, (err) => {
    //     if (err) {
    //         return console.error(err)
    //     }
    //     console.log('Text has been saved to ' + fileName + "." + format)
    // })
    await textToSpeak
    say.export(textToSpeak, say.getInstalledVoices(), 1, fileName + "." + format)
    return fileName+"."+format
}
 function convertTTS(textToSpeak,callback){

    // say.export(textToSpeak, say.getInstalledVoices(), 1, fileName + "." + format, (err) => {
    //     if (err) {
    //         return console.error(err)
    //     }
    //     console.log('Text has been saved to ' + fileName + "." + format)
    // })
    return say.speak(textToSpeak, say.getInstalledVoices(), 1,callback)
}
module.exports = {convertTextToSpeech,convertTTS};
