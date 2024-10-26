const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Import mysql2 package
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const fs = require('fs');

app.use(cors());
app.use(express.json());

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      ca: fs.readFileSync(process.env.SSL_CA),
    },
  });

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Sample route to test database connection
app.get('/data', (req, res) => {
    db.query('SELECT * FROM devquestdbtestone.tblonetest;', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            res.json(results);
        }
    });
});
app.post('/api/insert', (req, res) => {
    const { name, age } = req.body;
  
    const query = 'INSERT INTO devquestdbtestone.tblonetest (name, age) VALUES (?, ?)';
    db.execute(query, [name, age], (err, results) => {
      if (err) {
        console.error('Failed to insert data:', err);
        res.status(500).send('Failed to insert data');
      } else {
        res.status(200).send('Data inserted successfully');
      }
    });
  });
  
// Root route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
