export default oauth.microsoftEventHandler({
  async onSuccess(_, { user }) {
    return user
  },
})
