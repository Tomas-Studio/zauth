export default defineEventHandler(async (event) => {
  const payload = event.context.user.id
  return { payload }
})
