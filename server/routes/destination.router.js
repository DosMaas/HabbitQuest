const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for destinations
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


// router.put('/', rejectUnauthenticated, (req, res) => {
//   const query = `
//     UPDATE habit_destination 
//     SET active = true 
//     WHERE id = $1 
//     AND user_id = $2`;
//   const queryParams = [req.body.user_id, req.body.destination_id, req.body.start_date, req.body.active];
//   pool.query(query, queryParams)
//     .then(() => {
//       res.sendStatus(201);
//     }).catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });

// router.post('/', rejectUnauthenticated, (req, res) => {
//   const destinationID = req.body.destinationID;
//   const userID = req.body.userID;
//   const query = `
//     INSERT INTO habit_destination 
//       ("user_id", "destination_id", "start_date", "active") 
//     VALUES 
//       ($1, $2, NOW(), true)
//     RETURNING *
//   ;`;
//   const values = [userID, destinationID];
//   pool.query(query, values)
//     .then(result => {
//       // res.sendStatus(201);
//       res.send(result.rows)
//     })
//     .catch(error => {
//       console.error(error);
//       res.sendStatus(500);
//     })
// })

router.post('/', rejectUnauthenticated, async (req, res) => {
  const { user_id, destination_id } = req.body;

  const checkQuery = `
    SELECT COUNT(*) AS count
    FROM habit_destination
    WHERE user_id = $1 AND destination_id = $2;
  `;

  const insertQuery = `
    INSERT INTO habit_destination 
      (user_id, destination_id, start_date, active) 
    VALUES 
      ($1, $2, NOW(), true)
    RETURNING *;
  `;

  const updateQuery = `
    UPDATE habit_destination
    SET active = 
      CASE 
        WHEN destination_id = $2 
        THEN true
        ELSE false
      END
    WHERE user_id = $1;
  `;

  const params = [user_id, destination_id];

  try {
    const checkResult = await pool.query(checkQuery, params);
    const count = checkResult.rows[0].count;

    if (count == 0) {
      // No record exists, insert new row
      const insertResult = await pool.query(insertQuery, params);
      const updateResult = await pool.query(updateQuery, params);

      res.send(insertResult.rows);
    } else {
      // Record exists, update existing row
      const updateResult = await pool.query(updateQuery, params);
      res.send(updateResult.rows);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
