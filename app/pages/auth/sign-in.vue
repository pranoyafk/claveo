<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

const authProviders = useAuthProviders();

const fields: AuthFormField[] = [
	{
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'Enter your email',
		required: true,
	},
	{
		name: 'password',
		type: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		required: true,
	},
];

const schema = z.object({
	email: z.email('Invalid email'),
	password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

function onSubmit(payload: FormSubmitEvent<Schema>) {
	console.log('Submitted', payload);
}
</script>

<template>
	<UPageCard class="w-full max-w-md">
		<UAuthForm
			:schema="schema"
			title="Sign In"
			description="Enter your credentials to access your account."
			:fields="fields"
			:providers="authProviders"
			@submit="onSubmit"
		>
			<template #footer>
				<div class="flex items-center justify-center gap-1">
					<span>Don't have an account?</span>
					<NuxtLink
						href="/auth/sign-up"
						class="text-default"
					>Sign Up</NuxtLink>
				</div>
			</template>
		</UAuthForm>
	</UPageCard>
</template>
