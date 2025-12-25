import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/projects/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/projects/$projectId"!</div>
}
