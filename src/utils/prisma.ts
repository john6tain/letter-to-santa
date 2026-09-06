import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
import {Pool} from 'pg';

const connectionString = process.env.POSTGRES_PRISMA_URL;
if (!connectionString) {
	throw new Error('POSTGRES_PRISMA_URL is not set');
}

const adapter = new PrismaPg({connectionString});
const prisma = new PrismaClient({adapter});

const openDb = async () => {
	return prisma;
};

export default openDb;
