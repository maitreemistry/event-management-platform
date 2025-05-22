const express = require('express');
const app = express();
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const bodyParser = require('body-parser');
const pool = require('./config/database'); // Ensure correct path
const { getEvents } = require('./models/eventModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use('/events', eventRoutes);
app.use('/feedback', feedbackRoutes);  // ✅ Handled in `feedbackRoutes.js`

// Home Route
app.get('/', async (req, res) => {
    try {
        const events = await getEvents();
        console.log(events);
        res.render('pages/home', { events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for Create Event Page
app.get('/events/create', (req, res) => {
    res.render('pages/createEvent');
});

// // Route for Feedback Page
// app.get('/feedback', (req, res) => {
//     res.render('pages/feedback');
// });

app.get('/feedback', async (req, res) => {
    try {
        const result = await pool.query("SELECT id, name FROM events"); // Fetch events
        res.render('pages/feedback', { events: result.rows });  // Pass events to the template
    } catch (error) {
        console.error("Error rendering feedback page:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route for Event Details
app.get('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const event = {
        id: eventId,
        name: `Event ${eventId}`,
        date: `2025-02-2${eventId}`,
        location: `Venue ${eventId}`,
        description: `Description for Event ${eventId}`
    };

    if (event) {
        res.render('pages/event-details', { event });
    } else {
        res.status(404).send('Event not found');
    }
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
