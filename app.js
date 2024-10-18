const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'puran123',
  database: 'expense_tracker'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to DB: ' + err.stack);
    return;
  }
  console.log('Connected to DB');
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add transaction
app.post('/api/transactions', (req, res) => {
  const { text, amount } = req.body;
  const query = 'INSERT INTO transactions (text, amount) VALUES (?, ?)';
  db.query(query, [text, amount], (err, result) => {
    if (err) throw err;
    res.status(201).send('Transaction added');
  });
});

// Delete transaction
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM transactions WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send('Transaction deleted');
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
