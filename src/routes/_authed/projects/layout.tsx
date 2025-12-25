import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ProjectsHeader } from './-components/header'

export const Route = createFileRoute('/_authed/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <ProjectsHeader />
      <Outlet />
    </main>
  )
}
