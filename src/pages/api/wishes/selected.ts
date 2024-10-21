import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";
import openDb from "@/utils/prisma";

async function getSelectedWishes(userId: number) {
    const db = await openDb();

    const selectedWishes = await db.selectedWish.findMany({
        where: {
            userId,
        },
        include: {
            wish: {
                include: {
                    user: true,
                },
            },
        },
    });

    await db.$disconnect(); // Disconnect from the database
    return selectedWishes;
}

const getSelectedWish = async (req: NextApiRequest, res: NextApiResponse) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'Authorization token is missing'});
    }
    const token = authHeader.split(' ')[1];
    const userId = getUserId(token);
    const wishes = await getSelectedWishes(userId);
    res.status(200).json(wishes);
};

export default authenticate(getSelectedWish);