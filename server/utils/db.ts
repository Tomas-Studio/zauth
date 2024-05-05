import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { eq, sql } from 'drizzle-orm'
import * as schema from '~/server/database/schema'

const sqlQuery = neon(process.env.NUXT_DATABASE_URL!)

export function useDB() {
  return drizzle(sqlQuery, { schema })
}

export const getUserFromRt = useDB()
  .select({ user: schema.users })
  .from(schema.refreshTokens)
  .where(eq(schema.refreshTokens.tokenId, sql.placeholder('id')))
  .innerJoin(schema.users, eq(schema.refreshTokens.userId, schema.users.id))
  .limit(1)
  .prepare('getUserFromRt')
