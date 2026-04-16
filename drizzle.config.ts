import { defineConfig } from "drizzle-kit";
import { ENV } from './config/dotenv'
export default defineConfig({
  dialect: "postgresql",    
  schema: './db/schema',
  out: "./drizzle",
  verbose: true,
  strict: true, 
  dbCredentials: {
    url: ENV.DATABASE_URL
  },
  migrations: {
    table: 'my-migrations-table',
    schema: 'public',
  },               
});