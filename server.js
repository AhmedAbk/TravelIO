//server setup
import express from "express";
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '8624',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//server setup

//middel wear
app.use(cors());
app.use(express.json());  
//middel wear

//get all city
app.get('/api/cities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cities');
    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get city by id

app.get("/api/cities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM cities c, dest d WHERE c.destid=d.destid and c.destid= $1", [id]);
    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//get all dest
app.get('/api/dest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dest');
    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get dest by id
app.get('/api/dest/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM dest WHERE destid = $1', [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//auth
app.post('/api/register', async (req, res) => {
  const { name, phone, cin, email, pass, married, single } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "user" (name, phone, cin, email, pass, married, single) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, phone, cin, email, pass, married, single]
    );

    const newUser = result.rows[0];
    res.json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query('SELECT email, pass FROM "user" WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const userData = result.rows[0];
      res.json({ data: userData });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//auth

 