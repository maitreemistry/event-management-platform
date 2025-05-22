// backend/config/database.js
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'event_management',
    password: '',
    port: 5432,
});

module.exports = pool;

