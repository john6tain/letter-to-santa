import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function getWishes() {
	const db = await openDb();
	const sql = 'SELECT * FROM wishes';
	const result = await db.get(sql,);
	await db.close();
	return result;
}

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
	const wishes = await getWishes();
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({message: 'Authorization token is missing'});
	}
	const token = authHeader.split(' ')[1];

	res.status(200).json([wishes]);
};

export default authenticate(protectedRoute);