import { createUser, getUserByEmail } from '~/server/service/user'
import { selectUserSchema } from '~/types'

export const ZodProviderLoginResponse = z.object({
  accessToken: z.string(),
  user: selectUserSchema,
})

export default oauth.microsoftEventHandler({
  async onSuccess(event, { user }) {
    const fetchUser = await getUserByEmail(user.mail)

    if (!fetchUser) {
      const createdUser = await createUser({
        email: user.mail,
        firstname: user.givenName,
        lastname: user.surname,
        authType: 'microsoft',
      })

      const { accessToken, refreshToken } = await setTokens(event, createdUser[0])

      sendRefreshToken(event, refreshToken)

      return await parseDataAs({ accessToken, user: createdUser[0] }, ZodProviderLoginResponse)
    }

    const { accessToken, refreshToken } = await setTokens(event, fetchUser)

    sendRefreshToken(event, refreshToken)

    return await parseDataAs({ accessToken, user: fetchUser }, ZodProviderLoginResponse)
  },
})
