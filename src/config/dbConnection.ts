import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from '../db'
import { ENV } from '../config/dotenv'
const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});
export const db = drizzle({ client: pool, schema });