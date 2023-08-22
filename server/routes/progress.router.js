const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/habits', rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT 
      h.id, 
      h.name, 
      COUNT(DISTINCT DATE_TRUNC('day', hl.created_date)) AS completion_count, 
      (CURRENT_DATE - h.created_date) +1 AS days_since_creation,
      CASE
        WHEN ((CURRENT_DATE - h.created_date) + 1) = 0 THEN 0
        ELSE COALESCE(
          ROUND(
              (COUNT(DISTINCT DATE_TRUNC('day', hl.created_date))::numeric /
              NULLIF((CURRENT_DATE - h.created_date) + 1, 0)::numeric) * 100
          ), 0
        )
      END AS completion_percentage
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

// how many steps to destinations
// how many steps complete - habit log table
// percentage between those two numbers

router.get('/destinations', rejectUnauthenticated, async (req, res) => {
  const sql = `
    WITH ActiveDestination AS (
      -- Get the active destination's distance for the user
      SELECT
          d.distance, 
          d.id,
          d.image_url,
          d.name
      FROM
          destinations d
      JOIN habit_destination hd ON d.id = hd.destination_id
      WHERE
          hd.active = TRUE
          AND hd.user_id = $1
      LIMIT 1
    ),

    DistinctHabitDates AS (
        -- Count distinct days habits were completed for the user, per habit, then sum them up
        SELECT
            SUM(habit_dates_count) AS total_habit_dates_count
        FROM (
            SELECT
                habit_id,
                COUNT(DISTINCT created_date) AS habit_dates_count
            FROM
                habit_log hl
            WHERE
                hl.habit_id IN (SELECT id FROM habits WHERE user_id = $1)
            GROUP BY
                habit_id
        ) AS subquery
    )

    SELECT
        a.distance AS target_distance,
        a.id AS destination_id,
        a.image_url,
        a.name AS destination_name,
        dh.total_habit_dates_count AS steps_completed,
        ROUND((dh.total_habit_dates_count::decimal / a.distance::decimal) * 100, 2) AS percentage_completion
    FROM
        ActiveDestination a
    CROSS JOIN
        DistinctHabitDates dh;
  `; // End sql

  try {
    const result = await pool.query(sql, [req.user.id]);
    res.send(result.rows[0]);
  } catch (error) {
    console.error('Error: get destinations on daily page', error);
    res.sendStatus(500);
  }; // End try/catch
}); // End GET route

module.exports = router;