export default oauth.microsoftEventHandler({
  async onSuccess(event) {
    return sendRedirect(event, '/')
  },
})
