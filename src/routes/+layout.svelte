<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import '$lib/mwc-init.ts'

	const { children } = $props()

	afterNavigate((nav) => {
		if (import.meta.env.DEV) {
			return
		}

		window.goatcounter?.count({
			path: nav.to?.route.id ?? 'unknown',
		})
	})
</script>

{@render children()}
