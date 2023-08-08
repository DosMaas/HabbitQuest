const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM destinations ORDER BY distance ASC`;
  pool.query(query)
  .then(result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.error('ERROR: Get destinations', err);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
