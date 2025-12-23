import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconBrand4chan, IconLockPassword, IconMail } from '@tabler/icons-react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group'
import { OauthButtons } from './-components/oauth-buttons'

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <form>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <Link to="/" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <IconBrand4chan className="size-6" />
            </div>
            <span className="sr-only">Claveo</span>
          </Link>
          <h1 className="text-xl font-bold">Welcome back to Claveo.</h1>
          <FieldDescription>
            Don&apos;t have an account? <Link to="/auth/sign-up">Sign up</Link>
          </FieldDescription>
        </div>
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
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <OauthButtons />
      </FieldGroup>
    </form>
  )
}
