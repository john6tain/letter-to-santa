import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";
import Wish from "@/models/wish";

async function getWishes(userId: number) {
	const db = await openDb();

	const wishes = await db.wish.findMany({
		where: {
			user: {
				id: {
					not: userId,
				},
			},
			selectedWishes: {
				none: {},
			},
		},
		include: {
			user: true,
		},
	});

	await db.$disconnect();
	return wishes.map((wishes: Wish) => ({
		id: wishes.id,
		title: wishes.title,
		description: wishes.description,
		link: wishes.link,
		username: wishes.user.username,
	}));
}

const getAllWishes = async (req: NextApiRequest, res: NextApiResponse) => {

	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({message: 'Authorization token is missing'});
	}
	const token = authHeader.split(' ')[1];
	const userId = getUserId(token);
	const wishes = await getWishes(userId);
	res.status(200).json(wishes);
};

export default authenticate(getAllWishes);
