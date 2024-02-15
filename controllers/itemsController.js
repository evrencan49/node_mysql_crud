const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Controller for handling CRUD operations
const itemsController = {
  createItem: (req, res) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, name, description });
    });
  },

  getItems: (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  },

  getItemById: (req, res) => {
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
  },

  updateItem: (req, res) => {
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
  },

  deleteItem: (req, res) => {
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
  },
};

module.exports = itemsController;
