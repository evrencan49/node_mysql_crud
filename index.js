const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0c&C@Wy2s',
  database: 'nodejscrud',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a new record
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, description });
  });
});

// Get all records
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a specific record by ID
app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});

// Update a record by ID
app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ id, name, description });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});

// Delete a record by ID
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
