import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { init } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'

export const roleEnum = pgEnum('role', ['regular', 'admin', 'manager'])
export const authTypeEnum = pgEnum('auth_type', ['microsoft', 'google', 'linkedin', 'email'])

const createUserId = init({ random: Math.random, length: 30, fingerprint: 'zauth-user-id' })
const createRefreshTokenId = init({ random: Math.random, length: 35, fingerprint: 'zauth-session-id' })
const createPostId = init({ random: Math.random, length: 25, fingerprint: 'zauth-post-id' })

export const users = pgTable('users', {
  id: text('id').$defaultFn(() => createUserId()).primaryKey(),
  email: text('email').notNull().unique(),
  firstname: text('firstname').notNull(),
  lastname: text('lastname').notNull(),
  role: roleEnum('role').default('regular').notNull(),
  authType: authTypeEnum('auth_type').default('email').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const refreshTokens = pgTable('refresh_tokens', {
  tokenId: text('token_id').$defaultFn(() => createRefreshTokenId()).primaryKey(),
  expireAt: timestamp('expire_at').notNull(),
  userId: text('user_id').notNull().unique().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const posts = pgTable('posts', {
  id: text('id').$defaultFn(() => createPostId()).primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] }),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  post: many(posts),
}))

export type InsertUser = typeof users.$inferInsert

export type User = typeof users.$inferSelect

export type InsertRefreshToken = typeof refreshTokens.$inferInsert

export type RefreshToken = typeof refreshTokens.$inferSelect
