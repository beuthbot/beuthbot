/**
 *
 * Cat Micrososervice is a tiny microservice for BHT-Bot
 *
 * It is meant for showcasing how a BHT-Bot Service with the
 * newly created @bhtbot/bhtbotservice Framework might look like.
 *
 * Also it's the first service implemented in Typescript, so this
 * might be a good starting point / boilerplate if you plan to create
 * another BHT-Bot Service
 *
 * Contributers
 * - Dennis Walz 2020
 */

/* Init environment from .env for non-docker */
import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

/* Init Service */
import {Service, AppConfig} from '@bhtbot/bhtbotservice';
const config = new AppConfig();
config.port = process.env.CATS_PORT ? Number(process.env.CATS_PORT) : 3000;
const app = new Service('catService', config);

/* Init axios with auth header for cat-api */
const axios = require('axios');
axios.defaults.headers.common['x-api-key'] = process.env.CATS_APIKEY
const catAPIendpoint = 'https://api.thecatapi.com/v1/images/search';

/* Query api image */
const queryCat = async ()=>{
    let response = await axios.get(catAPIendpoint, { params: { limit:1, size:"full" } } )
    return { id: response.data[0].id, url: response.data[0].url}
}

/* Listen on endpoint /cat */
app.endpoint('cat', async (req, answ)=>{
    return answ.setContent((await queryCat()).url).setCacheable(false);
})

/* Start server */
app.start();