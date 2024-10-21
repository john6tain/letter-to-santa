import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";

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
                none: {
                    userId,
                },
            },
        },
        include: {
            user: true,
        },
    });

    await db.$disconnect();
    return wishes;
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
