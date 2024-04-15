import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['user', 'admin', 'manager'])
export const authTypeEnum = pgEnum('auth_type', ['microsoft', 'google'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  role: roleEnum('role').default('user').notNull(),
  authType: authTypeEnum('auth_type').notNull(),
})

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),

})
