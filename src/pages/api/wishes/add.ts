import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function addWish(id: number, userId: number, title: string, description: string, link: string) {
	const db = await openDb();
	const sql = `INSERT INTO wishes (id,userId, title, description, link)
																						VALUES (?,?, ?, ?, ?)
																						ON CONFLICT(id) DO UPDATE 
																						SET description = excluded.description,
    																				link = excluded.link;`;
	const result = await db.get(sql, [userId, title, description, link]);
	await db.close();
	return result;
}

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({message: 'Authorization token is missing'});
		}
		const token = authHeader.split(' ')[1];
		const {id, title, description, link} = req.body;
		try {
			const userId = getUserId(token);
			await addWish(id, userId, title, description, link)
			res.status(200).json({message: 'Желание Добавено'});

		} catch (error) {
			res.status(500).json({message: 'Опааааа.', error});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default authenticate(protectedRoute);