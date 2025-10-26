<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Pricing",
    to: "/docs/getting-started",
    active: route.path.startsWith("/docs/getting-started"),
  },
  {
    label: "Blogs",
    to: "/docs/components",
    active: route.path.startsWith("/docs/components"),
  },
  {
    label: "About",
    to: "https://go.nuxt.com/figma-ui",
  },
  {
    label: "Policy",
    to: "https://github.com/nuxt/ui/releases",
  },
]);
</script>

<template>
  <UHeader>
    <template #title>
      <Logo show-text />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UButton label="Sign In" variant="subtle" href="/auth/sign-in" />
      <UButton label="Get Started" href="/auth/sign-up" />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
