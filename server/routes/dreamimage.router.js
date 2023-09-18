const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const axios = require('axios');


const router = express.Router();


// GET most recent dream for title
// router.get('/', (req, res) => {

//     if (req.isAuthenticated()) {
//         const query = `SELECT * FROM "dream" ORDER BY "timestamp" DESC LIMIT 1; `;
//         pool.query(query)
//             .then(result => {
//                 res.send(result.rows);
//             })
//             .catch(err => {
//                 console.log('ERROR: Get all dreams failed', err);
//                 res.sendStatus(500)
//             })
//     }
// });


router.put('/:id', (req, res) => {
    console.log(' value for PUT /  route in image.ROUTER:', req.body);
    if (req.isAuthenticated()) {
        const params = req.params.id;
        let imageUrl = req.body.imageUrl
        console.log('imageUrl value is', imageUrl);
        let sqlValues = [imageUrl, params]

        let sqlQuery = `
        UPDATE "dream"
        SET "dream_image_url" = $1
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
    const dreamContent = req.body.dreamDesc
    axios({
        method: 'POST',
        url: `https://api.openai.com/v1/images/generations`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }, data: {
            "prompt": "Generate a 'fantastic art' styled illustration based on this dream description and do not include text in the art: " + dreamContent,
            "n": 1,
            "size": "256x256"
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