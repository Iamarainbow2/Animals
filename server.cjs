

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());

const connectionString = 'postgres://bhlusude:uF7SeAjj1JG4H_pTG1CxuBShYAx5VBGS@berry.db.elephantsql.com/bhlusude';

const pool = new Pool({
  connectionString: connectionString,
});

app.use(express.json());

// Get all animals
app.get('/api/animals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM animals');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get an animal by ID
app.get('/api/animals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM animals WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new animal
app.post('/api/animals', async (req, res) => {
  const { name, age, vaccine } = req.body;
  try {
    const result = await pool.query('INSERT INTO animals (name, age, vaccine) VALUES ($1, $2, $3) RETURNING *', [name, age, vaccine]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing animal
app.put('/api/animals/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, vaccine } = req.body;
  try {
    const result = await pool.query('UPDATE animals SET name = $1, age = $2, vaccine = $3 WHERE id = $4 RETURNING *', [name, age, vaccine, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an animal
app.delete('/api/animals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM animals WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json({ message: 'Animal deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
