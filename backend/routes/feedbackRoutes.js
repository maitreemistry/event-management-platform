const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Ensure you have a PostgreSQL connection file

// // Route to handle feedback form submission
// router.post('/', async (req, res) => {
//     try {
//         const { event_id, rating, comments } = req.body;

//         if (!event_id || !rating || !comments) {
//             return res.status(400).send("All fields are required.");
//         }

//         const query = `INSERT INTO feedback (event_id, rating, comments) VALUES ($1, $2, $3) RETURNING *`;
//         const values = [event_id, rating, comments];

//         const result = await pool.query(query, values);
//         console.log("Feedback Submitted:", result.rows[0]);

//         res.redirect('/feedback/success'); // Redirect to a success page
//     } catch (error) {
//         console.error("Error submitting feedback:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const result = await pool.query("SELECT id, name FROM events");
//         res.render('pages/feedback', { events: result.rows });
//     } catch (error) {
//         console.error("Error fetching events:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// Route to handle feedback form submission
router.post('/', async (req, res) => {
    try {
        const { event_id, rating, comments } = req.body;

        if (!event_id || !rating || !comments) {
            return res.status(400).send("All fields are required.");
        }

        const query = `INSERT INTO feedback (event_id, rating, comments) VALUES ($1, $2, $3) RETURNING *`;
        const values = [event_id, rating, comments];

        const result = await pool.query(query, values);
        console.log("Feedback Submitted:", result.rows[0]);

        // Redirect to a success page after submission
        res.redirect('/feedback/success');
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route for feedback success page
router.get('/success', (req, res) => {
    res.render('pages/feedback-success'); // Render the success page
});

module.exports = router;
