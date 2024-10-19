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

	// users
	await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  // wishes
	await db.exec(`
    CREATE TABLE IF NOT EXISTS wishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      link TEXT,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      UNIQUE(userId, title)
    );
`);

	// selected_wishes
	await db.exec(`
 		CREATE TABLE IF NOT EXISTS selected_wishes (
 			id INTEGER PRIMARY KEY AUTOINCREMENT,
 			userId INTEGER NOT NULL,
 			wishId INTEGER NOT NULL,
 			FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
 			FOREIGN KEY (wishId) REFERENCES wishes(id) ON DELETE CASCADE,
 		 	UNIQUE(userId, wishId)
		);
`);



	console.log('Database initialized');
	await db.close();
}

init().catch(err => {
	console.error('Error initializing database:', err);
});
