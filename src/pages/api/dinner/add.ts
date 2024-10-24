import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";

async function addDinner(userId: number, title: string, description: string, link: string) {
	const db = await openDb();

	// Use Prisma to upsert the wish
	const result = await db.dinner.upsert({
		where: {
			// Create a unique identifier based on userId and title
			userId_title: {
				userId,
				title,
			},
		},
		update: {
			description, // Update the description and link if exists
			link,
		},
		create: {
			userId,
			title,
			description,
			link,
		},
	});

	await db.$disconnect(); // Disconnect from the database
	// console.log(result); // Log the result for debugging
	return result; // Return the result of the operation
}

const add = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({message: 'Authorization token is missing'});
		}
		const token = authHeader.split(' ')[1];
		const {title, description, link} = req.body;
		try {
			const userId = getUserId(token);
			await addDinner(userId, title, description, link)
			res.status(200).json({message: 'Идеята Добавена'});

		} catch (error) {
			res.status(500).json({message: 'Опааааа.', error});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default authenticate(add);