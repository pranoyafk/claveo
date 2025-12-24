import { createFileRoute, Outlet } from '@tanstack/react-router'
import { HeaderSection } from './-components/header'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <HeaderSection />
      <Outlet />
    </>
  )
}
