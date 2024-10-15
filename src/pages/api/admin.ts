import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from '@/utils/auth';

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({message: 'This is a protected route!'});
};

export default authenticate(protectedRoute);