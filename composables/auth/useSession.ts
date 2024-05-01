import { StorageSerializers, useStorage } from '@vueuse/core'
import { STORAGE_KEYS } from '~/constants'
import type { User } from '~/types'

export const useAccessToken = () => useState<string>('access_token')
export const useUser = () => useStorage<User>(STORAGE_KEYS.USER, null, undefined, { serializer: StorageSerializers.object })

/**
 * Set access token
 * @param token - A JWT token
 */
export function setToken(token: string) {
  useAccessToken().value = token
}

/**
 * Set user in session storage
 * @param user - An authorized user
 */
export function setUser(user: User) {
  useUser().value = user
}

export async function useLogout() {
  await useRequestFetch()('/api/auth/logout')
    .then(() => { navigateTo('/') })
}
