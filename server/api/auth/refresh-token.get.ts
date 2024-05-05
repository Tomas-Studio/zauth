import { getUserByTokenId } from '~/server/service/user'

export default defineEventHandler(async (event) => {
  const rToken = await requireRefreshToken(event)
  const { user } = (await getUserByTokenId(rToken))[0]
  const accessToken = generateAccessToken(event, user)
  return { accessToken }
})
