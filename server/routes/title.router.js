const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const axios = require('axios');


const router = express.Router();


// GET most recent dream for title
router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "dream" ORDER BY "date" DESC LIMIT 1; `;
        pool.query(query)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log('ERROR: Get all dreams failed', err);
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
                    "content": "You are a dream analyzer. Respond with a brief title for this dream the user had."
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