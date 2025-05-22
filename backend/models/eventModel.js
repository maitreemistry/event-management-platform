// backend/models/eventModel.js
const pool = require('../config/database');

const getEvents = async () => {    
    try {
    const result = await pool.query('SELECT * FROM events');
    return result.rows;
} catch (error) {
    console.error('Error fetching events:', error);
    throw error;
}
};

const createEvent = async (name, date, location, description) => {    
    try {
    await pool.query('INSERT INTO events (name, date, location, description) VALUES ($1, $2, $3, $4)', [name, date, location, description]);
} catch (error) {
    console.error('Error creating event:', error);
    throw error;
}
};

module.exports = { getEvents, createEvent };
