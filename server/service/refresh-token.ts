import { eq } from 'drizzle-orm'
import { refreshTokens } from '../database/schema'
import type { InsertRefreshToken } from '~/types'

export async function getRefreshTokenByUserId(userId: string) {
  return useDB().query.refreshTokens.findFirst({
    where: (refreshTokens, { eq }) => eq(refreshTokens.userId, userId),
    with: { user: true },
  })
}

export async function getRefreshTokenById(rtId: string) {
  return useDB().query.refreshTokens.findFirst({
    where: (refreshTokens, { eq }) => eq(refreshTokens.tokenId, rtId),
  })
}

export async function createRefreshToken(rt: InsertRefreshToken) {
  return useDB().insert(refreshTokens).values(rt)
    .onConflictDoUpdate({ target: refreshTokens.userId, set: { expireAt: rt.expireAt } })
    .returning()
}

export async function clearRefreshToken(tokenId: string) {
  return useDB().delete(refreshTokens)
    .where(eq(refreshTokens.tokenId, tokenId))
    .returning({ deletedId: refreshTokens.tokenId })
}
