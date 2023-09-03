const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

//importing in openAI
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();



router.get('/', (req, res) => {

});


router.post('/', async (req, res) => {
    const { messages } = await
        axios({
            url: `https://api.openai.com/v1/chat/completions`
        }).then((response) => {
            console.log("this is the response data from post server side:", response.data);
            res.send(response.data);
        }).catch((error) => {
            console.log('POST to chatGPT fail:', error);
            res.sendStatus(500);
        })
});

module.exports = router;
