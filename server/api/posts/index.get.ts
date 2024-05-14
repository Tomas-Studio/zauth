export default defineEventHandler(async (event) => {
  const payload = event.context.user.id as string
  return { payload }
})
