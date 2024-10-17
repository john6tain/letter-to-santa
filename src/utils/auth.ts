import {NextApiRequest, NextApiResponse} from 'next';
import {verifyToken} from './jwt';

export const authenticate = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const token = req.headers.authorization?.split(' ')[1]; // Bearer token

		if (!token) {
			return res.status(401).json({message: 'Unauthorized'});
		}

		const verified = verifyToken(token);
		if (!verified) {
			return res.status(401).json({message: 'Unauthorized'});
		}

		return handler(req, res);
	};
};