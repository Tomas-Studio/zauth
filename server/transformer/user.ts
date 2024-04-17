import type { Payload } from '~/types'

export function userTransformer() {}

export function payloadTransformer(payload: any) {
  return {
    sub: payload.role,
  } as Payload
}
