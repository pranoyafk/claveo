<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your Name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
];

const providers = [
  {
    label: "Google",
    icon: "tabler:brand-google-filled",
    onClick: () => {
      toast.add({ title: "Google", description: "Login with Google" });
    },
  },
  {
    label: "GitHub",
    icon: "tabler:brand-github",
    onClick: () => {
      toast.add({ title: "GitHub", description: "Login with GitHub" });
    },
  },
];

const schema = z.object({
  name: z.string(),
  email: z.email("Invalid email"),
  password: z.string("Password is required").min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log("Submitted", payload);
}
</script>

<template>
  <UPageCard class="w-full max-w-md">
    <UAuthForm
      :schema="schema"
      title="Sign Up"
      description="Welcome! Please fill in the details to get started."
      :fields="fields"
      :providers="providers"
      @submit="onSubmit"
    >
      <template #footer>
        <div class="flex items-center justify-center gap-1">
          <span>Already have an account?</span>
          <NuxtLink href="/auth/sign-in" class="text-default">Sign In</NuxtLink>
        </div>
      </template>
    </UAuthForm>
  </UPageCard>
</template>
