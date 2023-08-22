const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route for daily habits
 */
router.get('/dailies', rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT * FROM habits 
    WHERE user_id = $1
    ORDER BY name ASC
  ;`;
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

// ! ⬇ Unused thus far:
// router.get('/history', rejectUnauthenticated, (req, res) => {
//   const query = `
//     SELECT * FROM habits 
//     JOIN habit_log ON habits.id = habit_log.habit_id
//     WHERE user_id = $1
//     ORDER BY name ASC
//   ;`;
//   pool.query(query, [req.user.id])
//     .then(result => {
//       res.send(result.rows);
//     })
//     .catch(error => {
//       console.error('Error: get habits on daily page', error);
//       res.sendStatus(500);
//     })
//   // GET route code here
// });



// PUT route to edit daily habits
router.put('/edit', rejectUnauthenticated, (req, res) => {
  const query = `
    UPDATE habits
    SET name = $1
    WHERE id = $2
  ;`;
  
  pool.query(query, [req.body.name, req.body.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error: update habits on daily page', error);
      res.sendStatus(500);
    })
  // PUT route end
})

// PUT route to complete daily habits
router.put('/complete', rejectUnauthenticated, async (req, res) => {
  const toggleQuery = `UPDATE habits SET complete = NOT complete WHERE id = $1`;
  const insertQuery = `
    INSERT INTO habit_log 
      (habit_id, created_date, destination_id)
    SELECT 
      $1, current_date, destination_id
    FROM habit_destination
    WHERE user_id = $2 AND active = TRUE;
  `;

  const toggleParams = [req.body.id];
  const insertParams = [req.body.id, req.user.id];

  try {
    await pool.query(toggleQuery, toggleParams); // Execute the first query to toggle the 'complete' column
    await pool.query(insertQuery, insertParams); // Execute the second query to insert into habit_log table
    res.sendStatus(200);
  } catch (error) {
    console.error('Error: completing habits on daily page', error);
    res.sendStatus(500);
  }; 
});

// DELETE route for daily habits
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const query = `
    DELETE FROM habits WHERE id=$1
  ;`;
  pool.query(query, [req.params.id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Error: delete habit on daily page', error);
      res.sendStatus(500);
    })
})
// DELETE route end


module.exports = router;
