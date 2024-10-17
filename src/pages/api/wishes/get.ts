import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function getWishes(userId) {
    const db = await openDb();
    const sql = 'SELECT * FROM wishes WHERE userId = ?';
    const result = await db.all(sql, [userId]);
    await db.close();
    // console.log(result)
    return result;
}

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'Authorization token is missing'});
    }
    const token = authHeader.split(' ')[1];
    const userId = getUserId(token);
    const wishes = await getWishes(userId);
    res.status(200).json(wishes);
};

export default authenticate(protectedRoute);