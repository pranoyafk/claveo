import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { createProjectSchema } from "@/lib/validation/projects/create";
import { slugify } from "@/utils/slugify";
import { IconPackage, IconSlash, IconUser } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { ReactElement } from "react";

export function CreateProjectDialog({ children }: { children: ReactElement }) {
  const { activeOrg } = useRouteContext({
    from: "/app/$organizationSlug",
  });
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      organizationId: activeOrg.id,
    },
    validators: { onSubmit: createProjectSchema },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Initialize a new project repository for your organization.</DialogDescription>
        </DialogHeader>
        <form
          id="create-project-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              listeners={{
                onChange: (e) => form.setFieldValue("slug", slugify(e.value)),
              }}
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel id={field.name}>Name</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            placeholder="Acme Corp Website"
                            type="text"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                            disabled={isSubmitting}
                            autoFocus
                          />
                          <InputGroupAddon>
                            <IconPackage />
                          </InputGroupAddon>
                        </InputGroup>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )}
                  </form.Subscribe>
                );
              }}
            />

            <form.Field
              name="slug"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            type="text"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                            disabled={isSubmitting}
                            autoFocus
                          />
                          <InputGroupAddon>
                            <IconSlash />
                          </InputGroupAddon>
                        </InputGroup>

                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )}
                  </form.Subscribe>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Description
                          <span className="text-muted-foreground"> (optional)</span>
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          placeholder="A complete redesign of the marketing site using Next.js and Tailwind."
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                          disabled={isSubmitting}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )}
                  </form.Subscribe>
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" form="create-project-form" disabled={!canSubmit || isSubmitting}>
                {isSubmitting && <Spinner />}
                Create Project
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
