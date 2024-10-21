import {NextApiRequest, NextApiResponse} from 'next';
import openDb from '../../../../db/db';
import {authenticate} from "@/utils/auth";
import {getUserId} from "@/utils/jwt";

async function removeWish(userId: number, id: string ) {
    const db = await openDb();
    const sql = `DELETE FROM wishes WHERE id = ? AND userId = ?`;
    const result = await db.run(sql, [id, userId]);
    await db.close();
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
            await removeWish(userId, id as string);
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