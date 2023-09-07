const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {

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
                console.log('User registration failed: ', err);
                res.sendStatus(500);
            });
    }
});



module.exports = router;
