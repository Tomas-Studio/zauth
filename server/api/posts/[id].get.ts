export const ZodIdParam = z.object({
  id: z.coerce.string(),
})

export default defineEventHandler(async (event) => {
  const { id } = await parseParamsAs(event, ZodIdParam)
  return { id }
})
