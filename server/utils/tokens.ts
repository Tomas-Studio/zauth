import type { H3Event } from 'h3'
import { getUserByEmail } from '../service/user'
import { userTransformer } from '../transformer/user'
import { createRefreshToken } from '../service/refresh-token'
import type { User } from '~/types'

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
  setCookie(event, 'RFTKEN', token, {
    httpOnly: true,
    sameSite: true,
  })
}

function expireAt(i: number) {
  const date = new Date().setMonth(new Date().getMonth() + i)
  return new Date(date)
}
