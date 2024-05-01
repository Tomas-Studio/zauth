import type { H3Event } from 'h3'
import { getUserByEmail } from '../service/user'
import { userTransformer } from '../transformer/user'
import { clearRefreshToken, createRefreshToken } from '../service/refresh-token'
import type { User } from '~/types'
import { STORAGE_KEYS } from '~/constants'

// export async function requireRefreshToken(event: H3Event){}

export async function setRefreshToken(data: User) {
  const user = await getUserByEmail(data.email)

  return user
}

export async function setTokens(event: H3Event, user: User) {
  const accessToken = generateAccessToken(event, userTransformer(user))
  const refreshToken = await createRefreshToken({ userId: user.id, expireAt: expireAt(4) })

  return {
    accessToken,
    refreshToken: refreshToken[0].tokenId,
  }
}

export function sendRefreshToken(event: H3Event, token: string) {
  setCookie(event, STORAGE_KEYS.REFRESH, token, {
    httpOnly: true,
    sameSite: true,
  })
}

export function clearCookies(event: H3Event, keys: Array<string>) {
  for (const key of keys)
    deleteCookie(event, key)
}

export async function clearUserSession(event: H3Event, keys: Array<string>) {
  const refreshTokenId = getCookie(event, STORAGE_KEYS.REFRESH)
  if (refreshTokenId) {
    const response = await clearRefreshToken(refreshTokenId)
    response[0].deletedId && clearCookies(event, keys)
  }
  clearCookies(event, keys)
}

function expireAt(i: number) {
  const date = new Date().setMonth(new Date().getMonth() + i)
  return new Date(date).toISOString()
}
