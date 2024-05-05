export default defineEventHandler(async (event) => {
  await requireRefreshToken(event)
  const payload = await requireAccessToken(event)
  return { payload }
})
