import type { Payload, User } from '~/types'

export function userTransformer(user: User) {
  return {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    authType: user.authType,
  }
}

export function payloadTransformer(payload: Payload) {
  return payload
}
