import { StorageSerializers, useStorage } from '@vueuse/core'
import { STORAGE_KEYS } from '~/constants'
import type { User } from '~/types'

export const useAccessToken = () => useState<string>('access_token')
export const useUser = () => useStorage<User>(STORAGE_KEYS.USER, null, undefined, { serializer: StorageSerializers.object })

/**
 * User session details & function
 * @returns loggedIn, user, logout & token
 */
export function useUserSession() {
  const userState = useUser()
  const accessToken = useAccessToken()
  return {
    loggedIn: computed(() => Boolean(userState.value)),
    user: computed(() => userState.value || null),
    logout,
    token: computed(() => accessToken.value),
    refresh: refreshAccessToken,
  }
}

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

/**
 * Logout user
 */
async function logout() {
  await useRequestFetch()('/api/auth/logout')
    .then(() => {
      useAccessToken().value = ''
      navigateTo('/')
    })
}

/**
 * Get a new access token
 */
async function refreshAccessToken() {
  await useRequestFetch()('/api/auth/refresh-token')
    .then((data) => {
      setToken(data.accessToken)
    })
}
