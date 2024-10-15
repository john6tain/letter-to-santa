import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

async function openDb() {
	return open({
		filename: './src/db/santa.db',
		driver: sqlite3.Database
	});
}

async function init() {
	const db = await openDb();

	await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

	console.log('Database initialized');
	await db.close();
}

init().catch(err => {
	console.error('Error initializing database:', err);
});
