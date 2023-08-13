const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM habits ORDER BY name ASC;`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.error('ERROR: Get Habits', error);
      res.sendStatus(500);
    })
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const habitName = req.body.newHabit;
  const userID = req.body.userID;
  console.log({habitName, userID}, 'post route habitName')
  const query = `INSERT INTO habits ("name", "complete", "user_id") VALUES ($1, false, $2) RETURNING *;`;
  pool.query(query, [habitName, userID])
    .then(results => {
      res.send(results.rows)
    }).catch(error => {
      console.error('ERROR: post habits', error);
      res.sendStatus(500)
    })
  // POST route code here
});

module.exports = router;