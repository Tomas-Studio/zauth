import { users } from '../database/schema'
import type { InsertUser } from '~/types'

export async function createUser(user: InsertUser) {
  return useDB().insert(users).values(user)
    .onConflictDoNothing({ target: users.email }).returning()
}

export async function getUserByEmail(email: string) {
  return useDB().query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })
}
