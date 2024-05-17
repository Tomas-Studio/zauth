import type { H3Event } from 'h3'
import { clearRefreshToken, createRefreshToken } from '../service/refreshToken'
import type { RefreshToken, User } from '~/types'
import { STORAGE_KEYS } from '~/constants'

export async function requireRefreshToken(event: H3Event) {
  return await parseCookieAs(event, STORAGE_KEYS.REFRESH, z.string())
}

export async function setTokens(event: H3Event, user: User) {
  const accessToken = generateAccessToken(event, user)
  const refreshToken = await createRefreshToken({ userId: user.id, expireAt: expireAt(1) })
  return { accessToken, refreshToken: refreshToken[0] }
}

export function sendRefreshToken(event: H3Event, rtoken: RefreshToken) {
  setCookie(event, STORAGE_KEYS.REFRESH, rtoken.tokenId, {
    httpOnly: true,
    expires: new Date(rtoken.expireAt),
    sameSite: true,
    maxAge: expiresToMaxAge(new Date(rtoken.expireAt)),
  })
}

export function clearCookies(event: H3Event, keys: Array<string>) {
  for (const key of keys)
    deleteCookie(event, key)
}

export async function clearUserSession(event: H3Event, keys: Array<string>) {
  const result = await safeParseCookieAs(event, STORAGE_KEYS.REFRESH, z.string())
  if (result.success)
    await clearRefreshToken(result.data)

  clearCookies(event, keys)
}

/**
 * Get expiry date for refreshToken
 * @param month - number of months
 */
function expireAt(month: number) {
  const date = new Date().setMonth(new Date().getMonth() + month)
  return new Date(date).toISOString()
}

/**
 * Convert expires to maxAge to set in cookie
 * @param expiresDate -An Expiry Date
 */
function expiresToMaxAge(expiresDate: Date) {
  const durationMs = expiresDate.getTime() - Date.now()
  const maxAgeSeconds = Math.floor(durationMs / 1000)
  return maxAgeSeconds
}
