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

//middlewear
app.use(cors());
app.use(express.json());  
//middlewear

//get all city
app.get('/api/cities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM city');
    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get city by id 
app.get("/api/cities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM city c, dest d WHERE c.destid=d.destid and c.destid= $1", [id]);
    
    res.json({ data: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/test/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM city WHERE id = $1', [id]);

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
    const result = await pool.query('SELECT * FROM city WHERE id = $1', [id]);

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
    console.error('Error fetching city:', error);
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
      'INSERT INTO city(name, image, prices, description, duration, person, rating, reviews, destid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
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


//update dest

app.put('/api/alldestinations/:id', async (req, res) => {
  const destId = req.params.id;
  const { destname, destimg } = req.body;

  try {
    // Update the destination in PostgreSQL
    const result = await pool.query(
      'UPDATE dest SET destname = $1, destimg = $2 WHERE destid = $3 RETURNING *',
      [destname, destimg, destId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const updatedDestination = result.rows[0];

    // Update the destination in the in-memory array (optional)
    destinations = destinations.map((dest) => (dest.destid === destId ? { ...dest, destname, destimg } : dest));

    res.status(200).json({ message: 'Destination updated successfully', updatedDestination });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//update dest

//update city
app.put('/api/allcity/:cityId', async (req, res) => {
  const { cityId } = req.params;
  const { name, image } = req.body;

  try {
    const updateQuery = 'UPDATE city SET name = $1, image = $2 WHERE id = $3 RETURNING *';
    const values = [name, image, cityId];

    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 1) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//update city
 
 


//delete City by id
app.delete('/api/allcity/:id', async (req, res) => {
  const id = req.params.id;

  try { 
    await pool.query('DELETE FROM city WHERE id = $1', [id]);

    res.json({ message: 'city deleted successfully' });
  } catch (error) {
    console.error('Error deleting city from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 
 
//reservations 
app.post('/api/reservations', async (req, res) => {
  try {
    // Extract reservation data from request body
    const { full_name, nb_person, start_date, end_date, price, city_id } = req.body;

    // Insert reservation into the database
    const query = `
      INSERT INTO reservation (full_name, nb_person, start_date, end_date, price, city_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [full_name, nb_person, start_date, end_date, price, city_id];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting reservation:', error);
    res.status(500).json({ error: 'Failed to insert reservation' });
  }
});
//reservations

app.get('/api/selectedcity/:id', async (req, res) => {
  const cityId = parseInt(req.params.id);

  try {
    const { rows } = await pool.query('SELECT * FROM city WHERE id = $1', [cityId]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error fetching city details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/allcitiees', async (req, res) => {
  try {
    // Fetch all cities from the database
    const result = await pool.query('SELECT * FROM city');
    const cities = result.rows;

    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/allusers', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "user"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update a user
app.put('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, phone,email, pass } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE "user" SET name = $1, phone = $2, email = $3, pass = $4 WHERE id = $5',
      [name, phone,email,pass, userId]
    );
    if (rowCount === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete a user
app.delete('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const { rowCount } = await pool.query('DELETE FROM "user" WHERE id = $1', [userId]);
    if (rowCount === 1) {
      res.sendStatus(204); // No Content
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//admin stats
app.get('/stats/cities', async (req, res) => {
  try {
    // Fetch all cities from the database
    const result = await pool.query('SELECT count(id) as numofcites FROM city');
    const cities = result.rows;

    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/stats/income', async (req, res) => {
  try {
    // Fetch all cities from the database
    const result = await pool.query('SELECT sum(price) as Income from reservation');
    const cities = result.rows;

    res.json(cities);
  } catch (error) {
    console.error('Error fetching income from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/stats/dests', async (req, res) => {
  try { 
    const result = await pool.query('SELECT count(destid) as numofdests from dest');
    const cities = result.rows;

    res.json(cities);
  } catch (error) {
    console.error('Error fetching dests from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/stats/users', async (req, res) => {
  try { 
    const result = await pool.query('SELECT count(id) as numofusers from "user"');
    const cities = result.rows;

    res.json(cities);
  } catch (error) {
    console.error('Error fetching users from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/allreservations', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM reservation WHERE full_name LIKE \'Ahmed\'');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reservations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/cancelreservation/:id', async (req, res) => {
  const reservationId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM reservation WHERE id = $1 RETURNING *', [reservationId]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Reservation not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error canceling reservation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});