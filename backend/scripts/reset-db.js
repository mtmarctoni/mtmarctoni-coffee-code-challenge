#!/usr/bin/env node
import { Pool } from 'pg';

// Import the sample data exported from `src/data/sampleData.js`.
// The file exports `sampleData`, so import and alias it to `sample`.
import { sampleData } from '../src/data/sampleData.js';

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1234',
  database: process.env.POSTGRES_DB || 'mvst-coffee-challenge-db',
});

async function reset() {
  const client = await pool.connect();
  try {
    console.log('Resetting coffees table...');
    await client.query('BEGIN');
    await client.query('DROP TABLE IF EXISTS coffees');
    await client.query(`
      CREATE TABLE coffees (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        imageUrl TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `);

    for (const it of sampleData) {
      await client.query(
        'INSERT INTO coffees(title, description, price, imageUrl, category) VALUES($1,$2,$3,$4,$5)',
        [it.title, it.description, it.price, it.imageUrl, it.category]
      );
    }

    await client.query('COMMIT');
    console.log('DB reset and sample data inserted.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to reset DB:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

reset();
