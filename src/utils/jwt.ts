import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: object) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		return null; // Token is invalid or expired
	}
};