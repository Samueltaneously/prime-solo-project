const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const params = req.user.id;
        const query = `SELECT * FROM "dream" WHERE "user_id" = $1 ORDER BY "date" DESC `;
        pool.query(query, [params])
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

    if (req.isAuthenticated()) {
        const dream_description = req.body.dream_description;
        const user_id = req.user.id;
        const queryText = `INSERT INTO "dream" (user_id, dream_description)
        VALUES ($1, $2)`;
        pool
            .query(queryText, [user_id, dream_description])
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.log('New dream upload failed: ', err);
                res.sendStatus(500);
            });
    }
});



module.exports = router;
