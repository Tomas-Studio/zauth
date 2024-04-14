import { migrate } from 'drizzle-orm/neon-http/migrator'
import { consola } from 'consola'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev)
    return

  await migrate(useDB(), { migrationsFolder: 'server/database/migrations' })
    .then(() => {
      consola.success('Database migrations done')
    })
    .catch((error) => {
      consola.error('Database migrations failed', error)
    })
})
