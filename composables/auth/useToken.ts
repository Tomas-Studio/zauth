export const useAccessToken = () => useState<string>('access_token')

/**
 * Set access token
 * @param token
 */
export function setToken(token: string) {
  const accessToken = useAccessToken()
  accessToken.value = token
}
