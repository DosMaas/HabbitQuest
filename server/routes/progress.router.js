const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/habits', rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT 
      h.id, 
      h.name, 
      COUNT(hl.id) AS completion_count, 
      CURRENT_DATE - h.created_date AS days_since_creation
    FROM habits AS h
    LEFT JOIN habit_log AS hl ON h.id = hl.habit_id
    WHERE user_id = $1
    GROUP BY h.id, h.name
    ORDER BY h.id;
  `; // End query
  
  pool.query(query, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error: get habits on daily page', error);
      res.sendStatus(500);
    })
  // GET route code here
});

module.exports = router;