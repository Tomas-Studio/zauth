import UrlPattern from 'url-pattern'

const RESTRICTED_ENDPOINTS = [
  '/api/posts',
]

export default defineEventHandler(async (event) => {
  const isRestricted = RESTRICTED_ENDPOINTS.some((endpoint) => {
    const pattern = new UrlPattern(endpoint)
    return pattern.match(event.path)
  })

  if (!isRestricted)
    return

  await requireRefreshToken(event)
  const payload = await requireAccessToken(event)
  event.context.user = payload
})
