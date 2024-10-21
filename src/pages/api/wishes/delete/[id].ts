import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";

async function removeWish(userId: number, id: number) {
    const db = await openDb();

    const result = await db.wish.deleteMany({
        where: {
            id,
            userId,
        },
    });

    await db.$disconnect();
    return result;
}

const remove = async (req: NextApiRequest, res: NextApiResponse) => {
	const {id} = req.query
    if (req.method === 'DELETE') {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({message: 'Authorization token is missing'});
        }
        const token = authHeader.split(' ')[1];
        try {
            const userId = getUserId(token);
            await removeWish(userId, Number(id) as number);
            res.status(200).json({message: 'Желание е изтрито!'});

        } catch (error) {
            res.status(500).json({message: 'Опааааа.', error});
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default authenticate(remove);