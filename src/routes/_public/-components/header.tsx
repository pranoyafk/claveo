import * as React from 'react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { IconMenu, IconX } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/theme-toggle'

export function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Changelog', href: '/changelog' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Logo size={30} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost">
              <Link to="/auth/sign-in">Sign in</Link>
            </Button>
            <Button>
              <Link to="/auth/sign-up">Get Started</Link>
            </Button>
          </div>

          <ThemeToggle className="md:hidden" />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IconX className="h-5 w-5" />
            ) : (
              <IconMenu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Link to="/auth/sign-in">Sign in</Link>
              </Button>
              <Button className="w-full">
                <Link to="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
