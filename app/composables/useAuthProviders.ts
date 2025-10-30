import type { ButtonProps } from '@nuxt/ui';

export function useAuthProviders() {
	const toast = useToast();
	return computed<ButtonProps[]>(() => ([
		{
			label: 'Google',
			icon: 'tabler:brand-google-filled',
			onClick: () => {
				toast.add({ title: 'Google', description: 'Login with Google' });
			},
		},
		{
			label: 'GitHub',
			icon: 'tabler:brand-github',
			onClick: () => {
				toast.add({ title: 'GitHub', description: 'Login with GitHub' });
			},
		},
	]));
}
