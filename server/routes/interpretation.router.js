const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const axios = require('axios');

//importing in openAI
const openAI = require('openai')
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const router = express.Router();



router.get('/', (req, res) => {

});


router.post('/', (req, res) => {
    console.log('req.body', req.body);
    const dreamContent = req.body
    axios({
        method: 'POST',
        url: `https://api.openai.com/v1/chat/completions`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }, data: {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a dream analyzer. Respond with an interpretation of my dream description."
                },
                {
                    "role": "user",
                    "content": JSON.stringify(dreamContent)
                }]
        }
    }).then((response) => {
        console.log("response data from dream description post:", response.data);
        res.send(response.data);


    }).catch((error) => {
        console.log('POST to chatGPT fail:', error);
        res.sendStatus(500);
    })
});

module.exports = router;
