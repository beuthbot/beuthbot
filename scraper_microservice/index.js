const scraperService = require('./services/scraper');
const {Service, AppConfig} = require('@bhtbot/bhtbotservice');

/* Init Service */
const config = new AppConfig();
config.port = process.env.SCRAPER_PORT  || 7007
const app = new Service('scraper_service', config);

/* Listen on endpoint /scraper */
app.endpoint('scraper', async (req, answ) => {

    let intent = req.intent.name
    let entities = req.entities

    if(intent == "lehrkraft" && entities.length>0){
        const prof = await new Promise((resolve, reject) => {
            scraperService.getProfFromJson(entities[0].value).then(function(result){
                    resolve(result)
            })
        })
        answ.setContent(prof)
    }
    else if(intent == "vorlesungszeiten")
        return  answ.setContent(await scraperService.vorlesungsZeiten())
    else if(intent == "belegfrist")
        return answ.setContent(await scraperService.belegFrist())
    else if(intent == "beurlaubungFrist")
        return answ.setContent(await scraperService.beurlaubungFrist())
    else if( intent == "bewerbungsFristen"){
        for(let i = 0; i < entities.length; i++) {
            if (entities[i].value == 'Bachelor') {
                return  answ.setContent(await scraperService.bewerbungsFristenBachelor())
            }
            else if(entities[i].value == 'Master') {
                return  answ.setContent(await scraperService.bewerbungsFristenMaster())
            }
        }
    }

});

app.start();