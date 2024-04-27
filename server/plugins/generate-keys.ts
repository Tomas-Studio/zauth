import { randomBytes } from 'node:crypto'
import { consola } from 'consola'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev)
    return

  const atSecret = randomBytes(32).toString('hex')
  consola.success('Access Token Secret: ', atSecret)
})
