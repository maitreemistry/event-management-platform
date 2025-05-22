// backend/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../models/eventModel');

router.get('/', async (req, res) => {
    const events = await getEvents();
    res.render('pages/events', { events });
});

// router.post('/create', async (req, res) => {
//     const { name, date, location, description } = req.body;
//     await createEvent(name, date, location, description);
//     res.redirect('/');
// });

router.post('/create', async (req, res) => {
    const { name, date, location, description } = req.body;

    // Create the event in the database
    await createEvent(name, date, location, description);

    // Add a delay before redirecting
    setTimeout(() => {
        res.redirect('/'); // Redirect to home page after 2 seconds
    }, 5000); // Delay of 2 seconds (2000 milliseconds)
});

module.exports = router;