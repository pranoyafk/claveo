import { Link, useRouteContext } from '@tanstack/react-router'
import { UserMenu } from './user-menu'
import { OrgSwitcher } from './org-switcher'
import { Logo } from '@/components/logo'
import { Separator } from '@/components/ui/separator'

export function ProjectsHeader() {
  const { user } = useRouteContext({
    from: '/_authed',
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center justify-between max-w-5xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Logo size={28} showText={false} showBg={false} />
          </Link>

          <Separator orientation="vertical" />

          <OrgSwitcher />
        </div>
        <UserMenu user={user} />
      </div>
    </header>
  )
}
