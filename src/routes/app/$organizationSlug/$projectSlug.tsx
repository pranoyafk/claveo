import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$organizationSlug/$projectSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/$organizationSlug/$projectSlug"!</div>
}
