export default oauth.microsoftEventHandler({
  async onSuccess(event, { user }) {
    setCookie(event, 'user_email', user.mail, { sameSite: true })
    send(event, user.mail, 'application/json; charset=utf-8')
    return sendRedirect(event, '/posts')
  },
})
