import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'

export function OauthButtons() {
  return (
    <Field className="grid gap-4 sm:grid-cols-2">
      <Button variant="outline" type="button">
        <IconBrandGithub />
        Continue with Apple
      </Button>
      <Button variant="outline" type="button">
        <IconBrandGoogle />
        Continue with Google
      </Button>
    </Field>
  )
}
