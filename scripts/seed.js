const { db } = require('@vercel/postgres');
// const {
//   invoices,
//   customers,
//   users,
// } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');
const faunadb = require('faunadb');
const fs = require('fs');
const { getS3Records } = require('./s3-utils');

const q = faunadb.query;

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users
            (
                id
                UUID
                DEFAULT
                uuid_generate_v4
            (
            ) PRIMARY KEY,
                name VARCHAR
            (
                255
            ) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
                );
        `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                    INSERT INTO users (id, name, email, password)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}) ON CONFLICT (id) DO NOTHING;
                `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS invoices
            (
                id
                UUID
                DEFAULT
                uuid_generate_v4
            (
            ) PRIMARY KEY,
                customer_id UUID NOT NULL,
                amount INT NOT NULL,
                status VARCHAR
            (
                255
            ) NOT NULL,
                date DATE NOT NULL
                );
        `;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
                    INSERT INTO invoices (customer_id, amount, status, date)
                    VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status},
                            ${invoice.date}) ON CONFLICT (id) DO NOTHING;
                `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedMovies(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "movies" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS movies
            (
                id
                UUID
                DEFAULT
                uuid_generate_v4
            (
            ) PRIMARY KEY,
                name VARCHAR
            (
                255
            ) NOT NULL,
                description TEXT
            (
                255
            ) NOT NULL,
                short_description TEXT
            (
                255
            ) NOT NULL,
                hsl_url VARCHAR
            (
                255
            ),
                dash_url VARCHAR
            (
                255
            ),
                mp4_url VARCHAR
            (
                255
            ) 
                );
        `;

    console.log(`Created "movies" table`);

    // Only do this if you really want to reset records and rebuild
    // this takes awhile
    // const data = await getS3Records();

    const records = require('./records.json');

    // Insert data into the "movies" table
    const insertedMovies = await Promise.all(
      records.map(
        (movie) => client.sql`
                    INSERT INTO movies (id, name, description, short_description, hsl_url, dash_url, mp4_url)
                    VALUES (${movie.guid}, ${movie.name}, ${movie.description}, ${movie.shortDescription},
                            ${movie.hsl_url}, ${movie.dash_url} ${movie.mp4_url}) ON CONFLICT (id) DO NOTHING;
                `,
      ),
    );

    console.log(`Seeded ${insertedMovies.length} movies`);

    return {
      createTable,
      movies: insertedMovies,
    };
  } catch (error) {
    console.error('Error seeding movies:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedMovies(client);
  // await seedCustomers(client);
  // await seedInvoices(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
