import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../db/db';
import {signToken} from "@/utils/jwt";
import bcrypt from 'bcrypt';

async function verifyUser(username: string, password: string) {
	const db = await openDb();
	const sql = 'SELECT * FROM users where username = ?';
	const result = await db.get(sql, [username]);
	await db.close();
	return result && await bcrypt.compare(password, result.password) && result || false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const {username, password} = req.body;
		try {
			const user = await verifyUser(username, password)
			if (user) {
				const token = signToken({userId: user.id});
				res.status(200).json({message: 'Влизането беще успешно!', token});
			} else {
				res.status(403).json({message: 'Името или Паролата са невалидни'});
			}

		} catch (error) {
			res.status(500).json({message: 'Неупешно влизане', error});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}