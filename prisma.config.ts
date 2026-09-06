import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("src", "prisma", "schema.prisma"),
  migrate: {
    url: process.env.POSTGRES_PRISMA_URL,
  },
});
