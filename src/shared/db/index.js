import consola from 'consola';

import { dbConfig } from '../configs';
import * as queries from './queries';

const { Client } = require('pg');

const db = new Client({
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  user: dbConfig.dbUser,
  password: dbConfig.dbPassword,
  database: dbConfig.dbName,
});

async function initializeTables(db) {
  const createTablesQuery = `
    ${queries.eventQueries.createTable()}
  `;
  await db.query(createTablesQuery);
}

async function connectToDb() {
  try {
    await db.connect();
    await initializeTables(db);
    consola.success({ message: 'DB connection established', badge: true });
  } catch (err) {
    consola.error({ message: `DB connection error: "${err}"`, badge: true });
    process.exit();
  }
}

export { connectToDb, db };
