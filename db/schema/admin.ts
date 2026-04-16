import {
    pgTable,
    varchar,
    uuid,
    index,
    pgEnum,
    timestamp
} from "drizzle-orm/pg-core";

export const adminRole = pgEnum("admin_role", ["super_admin"]);

export const admin = pgTable("admin", {
    id: uuid("id").primaryKey().defaultRandom(), //
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email").notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: adminRole("role").default("super_admin").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
    index("admin_email_idx").on(t.email),
]);