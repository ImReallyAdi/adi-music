<script lang="ts">
	import { onMount } from 'svelte'
	import { updateThemeCssVariables, DEFAULT_THEME_COLOR } from '$lib/theme'

	let { children } = $props()

	onMount(() => {
		const html = document.documentElement
		const wasDark = html.classList.contains('dark')

		// Enforce Dark Mode for Landing Page to match "premium" feel
		html.classList.add('dark')

		// Initialize Theme Variables with Material Red
		updateThemeCssVariables(DEFAULT_THEME_COLOR, true)

		return () => {
			// Cleanup: Restore previous dark mode state if necessary
			if (!wasDark) {
				html.classList.remove('dark')
			}
		}
	})
</script>

{@render children()}
