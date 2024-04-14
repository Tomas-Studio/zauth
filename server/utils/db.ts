import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '~/server/database/schema'

const sql = neon(process.env.NUXT_DATABASE_URL!)

export function useDB() {
  return drizzle(sql, { schema })
}
