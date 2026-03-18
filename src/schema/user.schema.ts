import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'


export const UserTable = pgTable('users', {
    id: uuid('id').defaultRandom(),
    name: varchar('name', { length: 255 }).notNull()
})