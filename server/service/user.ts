import { users } from '../database/schema'
import type { NewUser } from '~/types'

export async function createUser(user: NewUser) {
  return useDB().insert(users).values(user)
    .onConflictDoNothing({ target: users.email }).returning()
}

export async function getUserByEmail(email: string) {
  return useDB().query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })
}
