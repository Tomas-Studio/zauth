import { eq } from 'drizzle-orm'
import { refreshTokens } from '../database/schema'
import type { NewRT } from '~/types'

export async function getRefreshTokenByUserId(userId: string) {
  return useDB().query.refreshTokens.findFirst({
    where: (refreshTokens, { eq }) => eq(refreshTokens.userId, userId),
    with: { user: true },
  })
}

export async function createRefreshToken(rt: NewRT) {
  return useDB().insert(refreshTokens).values(rt)
    .onConflictDoNothing({ target: refreshTokens.tokenId })
    .returning({ token: refreshTokens.tokenId })
}

export async function clearRefreshToken(tokenId: string) {
  return useDB().delete(refreshTokens)
    .where(eq(refreshTokens.tokenId, tokenId))
    .returning({ deletedId: refreshTokens.tokenId })
}
