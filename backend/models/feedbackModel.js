// backend/models/feedbackModel.js
const pool = require('../config/database');

const submitFeedback = async (eventId, rating, comments) => {
    await pool.query('INSERT INTO feedback (event_id, rating, comments) VALUES ($1, $2, $3)', [eventId, rating, comments]);
};

module.exports = { submitFeedback };