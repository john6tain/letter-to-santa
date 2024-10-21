import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";

async function addSelectedWish(userId: number, wishId: number) {
	const db = await openDb();
	const result = await db.selectedWish.create({
		data: {
			userId,
			wishId,
		},
	});

	await db.$disconnect();
	// console.log(result);
	return result;
}

const selectWish = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({message: 'Authorization token is missing'});
		}
		const token = authHeader.split(' ')[1];
		const {wishId} = req.body;
		try {
			const userId = getUserId(token);
			await addSelectedWish(userId, wishId as number)
			res.status(200).json({message: 'Желание Избрано'});

		} catch (error) {
			res.status(500).json({message: 'Опааааа.\n Не Можах да избера Желанието', error});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default authenticate(selectWish);