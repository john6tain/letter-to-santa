import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import openDb from "@/utils/prisma";

async function orderDinner(dinners: { id: number; order: number }[]) {
	const db = await openDb();

	const updatePromises = dinners.map(dinner => {

		return db.dinner.update({
			where: {
				id: dinner.id, // Update by card ID
			},
			data: {
				order: dinner.order, // Set the new order value
			},
		});
	});

	// await db.$disconnect();
	return  await Promise.all(updatePromises);
}

const order = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		try {
			const dinners = req.body;
			await orderDinner(dinners);
			res.status(200).json({message: 'Идеята за вечеря е разместена!'});

		} catch (error) {
			res.status(500).json({message: 'Опааааа.', error});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default authenticate(order);