import { STORAGE_KEYS } from '~/constants'

const KEYS = Object.values(STORAGE_KEYS)

export const ZodLogoutResponse = z.object({
  logout: z.boolean(),
})

export default defineEventHandler(async (event) => {
  await clearUserSession(event, KEYS)
  return await parseDataAs({ logout: true }, ZodLogoutResponse)
})
