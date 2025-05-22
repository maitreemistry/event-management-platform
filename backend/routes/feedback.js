const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL connection

// Handle feedback form submission
router.post('/feedback', async (req, res) => {
    try {
        const { event_id, rating, comments } = req.body;

        if (!eent_id || !rating || !comments) {
            return res.status(400).send("All fields are required.");
        }

        const query = `INSERT INTO feedback (event_id, rating, comments) VALUES ($1, $2, $3) RETURNING *`;
        const values = [event_id, rating, comments];

        const result = await pool.query(query, values);
        console.log("Feedback Submitted:", result.rows[0]);

        res.redirect('/feedback/success'); // Redirect to success page
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
