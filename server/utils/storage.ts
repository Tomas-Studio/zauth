import { createStorage, prefixStorage } from 'unstorage'
import sessionStorageDriver from 'unstorage/drivers/session-storage'

export function userSession() {
  const storage = createStorage({
    driver: sessionStorageDriver({ base: 'app:', sessionStorage, window }),
  })

  return prefixStorage(storage, 'app')
}

// Unclear what driver to use
