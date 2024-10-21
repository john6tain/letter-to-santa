import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

const openDb = async () => {
	return prisma;
};

export default openDb;
