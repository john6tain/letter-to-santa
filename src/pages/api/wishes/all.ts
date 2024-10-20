import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function getWishes(userId: number) {
    const db = await openDb();
    const sql = `
    SELECT wishes.*, users.username
    FROM wishes
    JOIN users ON wishes.userId = users.id
    LEFT JOIN selected_wishes ON wishes.id = selected_wishes.wishId AND selected_wishes.userId = ?
    WHERE users.id != ? AND selected_wishes.wishId IS NULL;
    `;
    const result = await db.all(sql, [userId, userId]);
    await db.close();
    // console.log(result)
    return result;
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
