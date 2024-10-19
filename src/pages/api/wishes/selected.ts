import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function getSelectedWishes(userId: number) {
    const db = await openDb();
    const sql = 'SELECT * FROM selected_wishes WHERE userId = ?';
    const result = await db.all(sql, [userId]);
    await db.close();
    // console.log(result)
    return result;
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