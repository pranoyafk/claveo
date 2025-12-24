import { getSessionFn } from '@/lib/services/get-session'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  beforeLoad: async () => {
    const data = await getSessionFn()
    if (data?.user) {
      throw redirect({
        to: '/dashboard',
      })
    }
    console.log(data)
    return
  },
})
function RouteComponent() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}
