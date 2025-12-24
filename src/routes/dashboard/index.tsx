import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  )
}
