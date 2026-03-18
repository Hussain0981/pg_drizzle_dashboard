
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
 id: uuid('id').defaultRandom(),
 name: varchar('name',{ length: 255 }).notNull(),
 age: integer('age').notNull(),
 email: varchar('email', {length: 255 }).notNull().unique(),
});