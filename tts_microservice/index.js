const ttsService = require('./services/ttsService');

const {Service, AppConfig, FileAnswer} = require('@bhtbot/bhtbotservice');

/* Init Service */
const config = new AppConfig();
config.port = process.env.PORT ? Number(process.env.PORT) : 7003;
const app = new Service('ttsService', config);

/* Listen on endpoint /tts_microservice */
app.endpoint('tts', async (req, answ) => {

    let text = req.registryAnswer.answer.content
    let lang = 'de'
    let name = "tts_audio"
    let format = "ogg"
    let path =  name + "." + format
    const filePath = await new Promise((resolve, reject) => {
        ttsService.convertTextToSpeech(text,name,format,lang,function (err, result) {
            if(err){ reject(error) }
            resolve(path)
        })
    })

    return FileAnswer.fromPath(filePath)

})

app.start();
