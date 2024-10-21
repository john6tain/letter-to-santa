// src/pages/api/register.ts
import {NextApiRequest, NextApiResponse} from 'next';

import bcrypt from 'bcrypt';
import openDb from "@/utils/prisma";

async function registerUser(username: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const db = await openDb();
	await db.user.create({
		data: {
			username,
			password: hashedPassword,
		},
	});
}

async function checkIfUserExists(username: string) {
	const db = await openDb();
	const user = await db.user.findUnique({
		where: {
			username,
		},
	});
	return user !== null;
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
