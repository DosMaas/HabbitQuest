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

router.get('/history', rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT * FROM habits 
    JOIN habit_log ON habits.id = habit_log.habit_id
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
router.put('/complete', rejectUnauthenticated, (req, res) => {
  // let complete = req.body.direction;
  let query = `UPDATE habits SET complete = NOT complete WHERE id=$1; `;

  pool.query(query, [req.body.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.error('Error: completing habits on daily page', error);
      res.sendStatus(500);
    })
  // PUT route end
})

// DELETE route for daily habits
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const query = `
    DELETE FROM habits WHERE id=$1
  ;`;
  pool.query(query, [req.params.id])
    .then(result => {
      console.log('Habit deleted', result)
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Error: delete habit on daily page', error);
      res.sendStatus(500);
    })
})
// DELETE route end


module.exports = router;

// Two separate queries in one function - one put to update the boolean to true, and one post to add the date tot he habit_log