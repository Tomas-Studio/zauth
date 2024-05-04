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

export async function requireAccessToken(event: H3Event) {
  const config = useRuntimeConfig(event)
  const aToken = await parseHeaderAs(event, 'Authorization', z.string())
  try {
    return jwt.verify(aToken, config.jwt.accessSecret)
  }
  catch (error) {
    throw createErrorResponse(error, 401, 'Unauthorized!')
  }
}

// export type Payload = ReturnType<typeof decodeAccessToken>
