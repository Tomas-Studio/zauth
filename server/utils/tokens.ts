import type { H3Event } from 'h3'
import { userTransformer } from '../transformer/user'
import { clearRefreshToken, createRefreshToken } from '../service/refresh-token'
import type { RefreshToken, User } from '~/types'
import { STORAGE_KEYS } from '~/constants'

export async function requireRefreshToken(event: H3Event) {
  return await parseCookieAs(event, STORAGE_KEYS.REFRESH, z.string())
}

export async function setTokens(event: H3Event, user: User) {
  const accessToken = generateAccessToken(event, userTransformer(user))
  const refreshToken = await createRefreshToken({ userId: user.id, expireAt: expireAt(61) })
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
  if (result.success) {
    const response = await clearRefreshToken(result.data)
    response[0].deletedId && clearCookies(event, keys)
  }
}

function expireAt(i: number) {
  const date = new Date().setMinutes(new Date().getMinutes() + i)
  return new Date(date).toISOString()
}

function expiresToMaxAge(expiresDate: Date) {
  const durationMs: number = expiresDate.getTime() - Date.now()
  const maxAgeSeconds: number = Math.floor(durationMs / 1000)
  return maxAgeSeconds
}
