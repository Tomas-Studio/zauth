import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import type { User } from '~/types'

export function generateAccessToken(
  event: H3Event,
  payload: Omit<User, 'createdAt' | 'updatedAt'>,
) {
  const config = useRuntimeConfig(event)

  return jwt.sign(payload, config.jwt.accessSecret, { expiresIn: '10m' })
}

export function decodeAccessToken(event: H3Event, token: string) {
  const config = useRuntimeConfig(event)

  try {
    return jwt.verify(token, config.jwt.accessSecret)
  }
  catch (error) {
    return null
  }
}
