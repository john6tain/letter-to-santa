import {NextApiRequest, NextApiResponse} from 'next';
import {signToken} from "@/utils/jwt";
import bcrypt from 'bcrypt';
import openDb from "@/utils/prisma";

async function verifyUser(username: string, password: string) {
	const db = await openDb();

	const user = await db.user.findUnique({
		where: {
			username,
		},
	});

	if (user && await bcrypt.compare(password, user.password)) {
		return user;
	}

	return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const {username, password} = req.body;
		try {
			const user = await verifyUser(username, password)
			if (user) {
				const token = signToken({userId: user.id});
				res.status(200).json({message: 'Влизането беше успешно!', token, username});
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