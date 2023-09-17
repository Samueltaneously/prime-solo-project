const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL Dreams
router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        const params = req.user.id;
        const query = `SELECT * FROM "dream" WHERE "user_id" = $1 ORDER BY "date" DESC; `;
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


// POST dream from UserPage
router.post('/', (req, res) => {

    if (req.isAuthenticated()) {
        const dream_description = req.body.dream_description;
        const user_id = req.user.id;
        const queryText = `INSERT INTO "dream" (user_id, dream_description)
        VALUES ($1, $2);`;
        pool
            .query(queryText, [user_id, dream_description])
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.log('New dream upload failed: ', error);
                res.sendStatus(500);
            });
    }
});

// DELETE single dream
router.delete('/:id', (req, res) => {

    if (req.isAuthenticated()) {
        pool
            .query(`DELETE FROM "dream" WHERE id=$1;`, [req.params.id])
            .then((result) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error DELETE /api/dream', error);
                res.sendStatus(500);
            })
    }
});

// UPDATE single dream
router.put('/:id', (req, res) => {

    if (req.isAuthenticated()) {

        let idToUpdate = req.body.dreamId
        let NEWdream_description = req.body.newDescription
        let sqlValues = [NEWdream_description, idToUpdate]

        let sqlQuery = `
        UPDATE "dream"
        SET "dream_description" = $1
        WHERE "id" = $2;
         `;

        pool.query(sqlQuery, sqlValues)
            .then((result) => {
                console.log('successful update for PUT /api/dream', result);
                res.sendStatus(201)
            }).catch((error) => {
                console.error('Error PUT /api/dream', error);
                res.sendStatus(500)
            })
    }
});


router.put('/firsttitle', (req, res) => {
    console.log('firstTitleGen value for /firsttitle route:', req.body);
    if (req.isAuthenticated()) {

        let firstTitleGen = req.body.firstTitleGen
        console.log('firstTitleGen value is', firstTitleGen);
        let sqlValues = [firstTitleGen]

        let sqlQuery = `
        UPDATE "dream"
        SET "dream_title" = $1
        WHERE "date" = (SELECT MAX(date) FROM "dream");
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
