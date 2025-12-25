import { createFileRoute } from '@tanstack/react-router'
import { ProjectsEmptyState } from './-components/empty-state'

export const Route = createFileRoute('/_authed/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-[90dvh]">
      <ProjectsEmptyState />
    </div>
  )
}
