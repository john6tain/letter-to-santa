import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function addSelectedWish(userId: number, wishId: string) {
    const db = await openDb();
    const sql = `INSERT INTO selected_wishes (userId, wishId) VALUES (?, ?);`;
    const result = await db.run(sql, [userId, wishId]);
    await db.close();
    console.log(result);
    return result;
}

const selectWish = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({message: 'Authorization token is missing'});
        }
        const token = authHeader.split(' ')[1];
        const {title, wishId} = req.body;
        try {
            const userId = getUserId(token);
            await addSelectedWish(userId, wishId)
            res.status(200).json({message: 'Желание Избрано'});

        } catch (error) {
            res.status(500).json({message: 'Опааааа.\n Не Можах да избера Желанието', error});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default authenticate(selectWish);