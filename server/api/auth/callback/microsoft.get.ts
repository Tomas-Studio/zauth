import { createUser, getUserByEmail } from '~/server/service/user'

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

      return { accessToken }
    }

    const { accessToken, refreshToken } = await setTokens(event, fetchUser)

    sendRefreshToken(event, refreshToken)

    return { accessToken, user: fetchUser }
  },
})
