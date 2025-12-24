import { createServerFn } from '@tanstack/react-start'
import { auth } from '../auth/config'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const getSessionFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const sessionData = await auth.api.getSession({ headers })

    return sessionData
  },
)
