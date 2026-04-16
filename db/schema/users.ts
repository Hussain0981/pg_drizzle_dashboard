import { relations } from "drizzle-orm";
import { timestamps } from './timestamps'
import {
  pgTable,
  varchar,
  uuid,
  index,
  pgEnum,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["Admin", "User"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // ✅ uuid
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRole("role").default("User").notNull(),
  ...timestamps,
}, (t) => [
  index("user_id_idx").on(t.id),
]);

export const usersOtp = pgTable("users_otp", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")                       // ✅ integer → uuid
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  hashedOtp: varchar("hashed_otp", { length: 255 }).notNull(),
  temporaryBlock: boolean("temporary_block").default(false),
  blockedUntil: timestamp("blocked_until"),
  retryAttempts: integer("retry_attempts").notNull().default(0),
  otpExpiry: timestamp("otp_expiry").notNull(),
  isVerified: boolean("is_verified").default(false),
  ...timestamps,
}, (table) => [
  index("otp_user_id_idx").on(table.userId),
]);

export const userRelationWithOTP = relations(usersOtp, ({ one }) => ({
  user: one(users, {
    fields: [usersOtp.userId],
    references: [users.id],
  }),
}));