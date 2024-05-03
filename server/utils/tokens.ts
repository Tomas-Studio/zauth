import type { H3Event } from 'h3'
import { getUserByEmail } from '../service/user'
import { userTransformer } from '../transformer/user'
import { clearRefreshToken, createRefreshToken, getRefreshTokenById } from '../service/refresh-token'
import type { User } from '~/types'
import { STORAGE_KEYS } from '~/constants'

/**
 * Require a user refresh token. Throws an error if refresh token is invalid.
 * @param event - A H3 event object.
 */
export async function requireRefreshToken(
  event: H3Event,
  opts: { statusCode?: number, message?: string } = {},
) {
  const rtId = await parseCookieAs(event, STORAGE_KEYS.REFRESH, z.string())
  const refreshToken = await getRefreshTokenById(rtId)

  if (!isValidRefreshToken(refreshToken!.expireAt)) {
    throw createError({
      statusCode: opts.statusCode || 401,
      message: opts.message || 'Unauthorized',
    })
  }

  return refreshToken?.tokenId
}

export async function setRefreshToken(data: User) {
  const user = await getUserByEmail(data.email)
  return user
}

export async function setTokens(event: H3Event, user: User) {
  const accessToken = generateAccessToken(event, userTransformer(user))
  const refreshToken = await createRefreshToken({ userId: user.id, expireAt: expireAt(4) })
  return { accessToken, refreshToken: refreshToken[0].tokenId }
}

export function sendRefreshToken(event: H3Event, token: string) {
  setCookie(event, STORAGE_KEYS.REFRESH, token, { httpOnly: true, sameSite: true })
}

export function clearCookies(event: H3Event, keys: Array<string>) {
  for (const key of keys)
    deleteCookie(event, key)
}

export async function clearUserSession(event: H3Event, keys: Array<string>) {
  const rtId = await parseCookieAs(event, STORAGE_KEYS.REFRESH, z.string())
  const response = await clearRefreshToken(rtId)
  response[0].deletedId && clearCookies(event, keys)
}

function expireAt(i: number) {
  const date = new Date().setMonth(new Date().getMonth() + i)
  return new Date(date).toISOString()
}

function isValidRefreshToken(expireAt: string) {
  const now = new Date()
  return now < new Date(expireAt)
}
