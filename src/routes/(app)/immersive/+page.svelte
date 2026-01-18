<script lang="ts">
	import { goto } from '$app/navigation'
	import ImmersivePlayer from '$lib/components/player/ImmersivePlayer.svelte'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	const { data: _ }: Props = $props()
</script>

<svelte:head>
	<title>Immersive Player - adi music</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
</svelte:head>

<ImmersivePlayer
	onClose={async () => {
		await goto('/library/tracks')
	}}
/>
