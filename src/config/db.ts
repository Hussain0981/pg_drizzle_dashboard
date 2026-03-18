import { drizzle } from "drizzle-orm/pg-core";
export const db = drizzle(process.env.DATABASE_URL);