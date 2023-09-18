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


router.get('/:id', (req, res) => {

    if (req.isAuthenticated()) {
        const params = req.params.id;
        const query = `SELECT * FROM "dream" WHERE "id" = $1; `;
        pool.query(query, [params])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log('ERROR: Get ONE dream failed', err);
                res.sendStatus(500)
            })
    }
});

router.put('/:id', (req, res) => {
    console.log(' value for PUT /  route in interpretation.ROUTER:', req.body);
    if (req.isAuthenticated()) {
        const params = req.params.id;
        let dreamInterpretation = req.body.dreamInterpretation
        console.log('dreamInterpretation value is', dreamInterpretation);
        let sqlValues = [dreamInterpretation, params]

        let sqlQuery = `
        UPDATE "dream"
        SET "dream_interpretation" = $1
        WHERE "id" = $2;
         `;

        pool.query(sqlQuery, sqlValues)
            .then((res) => {
                console.log('successful update for PUT /api/dream', res);
                // res.sendStatus(201)
            }).catch((error) => {
                console.error('Error PUT /api/dream', error);
                res.sendStatus(500)
            })
    }
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
