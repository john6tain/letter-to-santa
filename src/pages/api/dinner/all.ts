import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";
import Wish from "@/models/wish";
import Dinner from "@/models/dinner";

async function getDinners(userId: number) {
	const db = await openDb();

	const dinners = await db.dinner.findMany({
		include: {
			user: true,
		},
	});

	await db.$disconnect();
	return dinners.map((dinners: Dinner) => ({
		id: dinners.id,
		title: dinners.title,
		description: dinners.description,
		link: dinners.link,
		username: dinners.user.username,
		enableEdit: dinners.user.id === userId,
	}));
}

const getAllDinners = async (req: NextApiRequest, res: NextApiResponse) => {

	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({message: 'Authorization token is missing'});
	}
	const token = authHeader.split(' ')[1];
	const userId = getUserId(token);
	const dinners = await getDinners(userId);
	res.status(200).json(dinners);
};

export default authenticate(getAllDinners);
