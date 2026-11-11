const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'appdb',
  port: 5432,
});

async function connectDb(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('✅ Connected to PostgreSQL');
      return;
    } catch (e) {
      console.log(`DB not ready, retry ${i + 1}/${retries}...`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  console.error('Could not connect to PostgreSQL');
  process.exit(1);
}

app.get('/', (req, res) => res.send('Hello from Node.js + Docker!'));

connectDb().then(() =>
  app.listen(3000, () => console.log('Server on :3000'))
);
