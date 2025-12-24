import { getSessionFn } from '@/lib/services/get-session'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    const data = await getSessionFn()
    if (!data) {
      throw redirect({
        to: '/auth/sign-in',
      })
    }
    return {
      user: data.user,
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
