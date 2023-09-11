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
            .catch((error) => {
                console.log('New dream upload failed: ', error);
                res.sendStatus(500);
            });
    }
});


router.delete('/', (req, res) => {

    if (req.isAuthenticated()) {
        pool
            .query(`DELETE FROM "dream" WHERE id=$1`, [req.params.id])
            .then((result) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error DELETE /api/dream', error);
                res.sendStatus(500);
            })
    }
});


router.put('/', (req, res) => {

    if (req.isAuthenticated()) {

        let idToUpdate = req.params.id
        let NEWdream_description = req.body.dream_description
        let sqlValues = [NEWdream_description, idToUpdate]

        let sqlQuery = `
        UPDATE "dream"
        SET "dream_description" = $1
        WHERE "id" = $2;
         `;

        pool.query(sqlQuery, sqlValues)
            .then((res) => {
                console.log('successful update for PUT /api/dream', res);
                res.sendStatus(201)
            }).catch((error) => {
                console.error('Error PUT /api/dream', error);
                res.sendStatus(500)
            })
    }
});


module.exports = router;
