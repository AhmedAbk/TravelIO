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
    
    res.json({ data: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/test/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM cities WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/city/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM cities WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      res.json({ data: result.rows[0] });
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    // Check if the cin already exists in the database
    const cinCheck = await pool.query('SELECT * FROM "user" WHERE cin = $1', [cin]);
    if (cinCheck.rows.length > 0) {
      // If cin already exists, return an error
      return res.status(400).json({ error: 'CIN must be unique' });
   
    } 
    // If cin is unique, proceed with the insertion
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

//addcity
app.post('/api/addcities', async (req, res) => {
  const newCity = req.body;

  try {
    // Insert the new city into the database
    const result = await pool.query(
      'INSERT INTO cities(name, image, prices, description, duration, person, rating, reviews, destid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        newCity.name,
        newCity.image,
        newCity.prices,
        newCity.description,
        newCity.duration,
        newCity.person,
        newCity.rating,
        newCity.reviews,
        newCity.destid,
      ]
    );

    const insertedCity = result.rows[0];
    res.status(201).json(insertedCity);
  } catch (error) {
    console.error('Error inserting city into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//addcity


//addDest
app.post('/api/adddestinations', async (req, res) => {
  const newDestination = req.body;

  try {
    // Insert the new destination into the database
    const result = await pool.query(
      'INSERT INTO dest (destid, destname, destimg) VALUES($1, $2, $3) RETURNING *',
      [newDestination.destid, newDestination.destname, newDestination.destimg]
    );

    const insertedDestination = result.rows[0];
    res.status(201).json(insertedDestination);
  } catch (error) {
    console.error('Error inserting destination into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//addDest


//GetDest
app.get('/api/alldestinations', async (req, res) => {
  try {
    // Fetch all destinations from the database
    const result = await pool.query('SELECT * FROM dest');
    const destinations = result.rows;

    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//GetDest

 
//deleteDestid

app.delete('/api/alldestinations/:destid', async (req, res) => {
  const destid = req.params.destid;

  try {
    // Delete the destination from the database
    await pool.query('DELETE FROM dest WHERE destid = $1', [destid]);

    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//deleteDestid


//GetDestid

app.put('/api/alldestinations/:destid', async (req, res) => {
  const destid = parseInt(req.params.destid);
  const updatedDestination = req.body;

  try {
    const result = await pool.query(
      'UPDATE dest SET destname = $1, destimg = $2 WHERE destid = $3 RETURNING *',
      [updatedDestination.destname, updatedDestination.destimg, destid]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Destination not found' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//GetDestid
