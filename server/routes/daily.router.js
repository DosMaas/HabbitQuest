const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route for daily habits
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM habits ORDER BY name ACS;`;
  pool.query(query)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.error('Error: get habits on daily page', error);
    res.sendStatus(500);
  })
  // GET route code here
});

/**
 * POST route for daily habits
 * 
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

// Two separate queries in one function - one put to update the boolean to true, and one post to add the date tot he habit_log