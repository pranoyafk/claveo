import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconLockPassword, IconMail, IconUser } from '@tabler/icons-react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { OauthButtons } from './-components/oauth-buttons'
import { Logo } from '@/components/logo'

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link to="/">
              <Logo showBg={false} showText={false} size={35} />
            </Link>
            <h1 className="text-xl font-bold">Welcome to Claveo.</h1>
            <FieldDescription>
              Already have an account? <Link to="/auth/sign-in">Sign in</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
              <InputGroupAddon>
                <IconUser />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <InputGroupAddon>
                <IconMail />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
              <InputGroupAddon align="inline-end">
                <IconLockPassword />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <Button type="submit">Continue</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <OauthButtons />
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{' '}
        <Link to="/404">Terms of Service</Link> and{' '}
        <Link to="/404">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
