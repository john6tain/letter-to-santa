import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';
import fs from 'fs';

// Set the path to your SQLite database file
const dbPath = process.env.NODE_ENV === 'production' ? '/tmp/santa.db' : path.join(process.cwd(), 'src', 'db', 'santa.db');

// Create the database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
	fs.writeFileSync(dbPath, 'santa.db'); // Create an empty file if it doesn't exist
}

const openDb = async () => {
	return open({
		filename: dbPath,
		driver: sqlite3.Database,
	});
};

export default openDb;