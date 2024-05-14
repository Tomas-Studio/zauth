export default defineEventHandler(async (event) => {
  const userId = event.context.user.id as string
  return { userId }
})
