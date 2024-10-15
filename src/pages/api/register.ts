// src/pages/api/register.ts
import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../db/db'; // Adjust the import according to your db setup
// Function to handle the registration logic
import bcrypt from 'bcrypt';

// Hash the password before saving it
async function registerUser(username: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const db = await openDb();
	const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
	await db.run(sql, [username, hashedPassword]);
	await db.close();
}

async function checkIfUserExists(username: string) {
	const db = await openDb();
	const sql = 'SELECT COUNT(*) AS count FROM users where username = ?';
	const result = await db.get(sql, [username]); // Use get to fetch a single row
	await db.close();
	console.log();
	return result.count > 0;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const {username, password} = req.body;
		try {
			if (await checkIfUserExists(username)) {
				res.status(401).json({message: 'Вече съществува потребител с такова име', error: 'Not logged in'});
			} else {
				await registerUser(username, password);
				res.status(200).json({message: 'Потребителелят е създаден успешно !'});
			}
		} catch (error) {
			res.status(500).json({message: 'Неупешно регистриране', error});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
