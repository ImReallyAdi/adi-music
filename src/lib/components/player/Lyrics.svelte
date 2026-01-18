<script lang="ts">
	import { usePlayer } from '$lib/stores/player/use-store.ts'
	import { fetchLyrics, parseSyncedLyrics, type SyncedLine } from '$lib/helpers/lyrics.ts'
	import { formatArtists } from '$lib/helpers/utils/text.ts'

	const player = usePlayer()

	let lyrics = $state<SyncedLine[] | string | null>(null)
	let loading = $state(false)
	let currentLineIndex = $state(-1)
	let container = $state<HTMLElement | null>(null)

	let lastTrackId = $state<number | null>(null)

	$effect(() => {
		const track = player.activeTrack
		if (!track) {
			lyrics = null
			return
		}

		if (track.id === lastTrackId) return
		lastTrackId = track.id

		loading = true
		lyrics = null
		fetchLyrics(formatArtists(track.artists), track.name, track.album, track.duration)
			.then((data) => {
				if (data) {
					if (data.synced) {
						lyrics = parseSyncedLyrics(data.synced)
					} else {
						lyrics = data.plain || 'No lyrics available'
					}
				} else {
					lyrics = 'No lyrics found'
				}
			})
			.finally(() => {
				loading = false
			})
	})

	$effect(() => {
		if (Array.isArray(lyrics)) {
			const time = player.currentTime
			let index = -1
			for (let i = 0; i < lyrics.length; i++) {
				if (lyrics[i].time <= time) {
					index = i
				} else {
					break
				}
			}

			if (index !== currentLineIndex) {
				currentLineIndex = index
				// Auto-scroll only if we found a line
				if (container && index !== -1) {
					const el = container.children[index] as HTMLElement
					if (el) {
						el.scrollIntoView({ behavior: 'smooth', block: 'center' })
					}
				}
			}
		}
	})
</script>

<div class="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
	{#if loading}
		<div class="animate-pulse text-title-md text-onSurfaceVariant">Loading lyrics...</div>
	{:else if typeof lyrics === 'string'}
		<div class="whitespace-pre-line text-body-lg text-onSurfaceVariant/80 overflow-y-auto h-full w-full px-4 py-8">
			{lyrics}
		</div>
	{:else if Array.isArray(lyrics)}
		<div
			bind:this={container}
			class="scrollbar-hide flex h-full w-full flex-col items-center overflow-y-auto py-[50vh] mask-image-gradient"
		>
			{#each lyrics as line, i}
				<div
					class="my-2 max-w-2xl cursor-pointer transition-all duration-500 ease-emphasized
                    {i === currentLineIndex ? 'scale-105 font-bold text-onSurface text-headline-sm blur-none opacity-100' : 'text-title-md text-onSurfaceVariant blur-[0.5px] opacity-50 hover:opacity-80'}"
					onclick={() => player.seek(line.time)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && player.seek(line.time)}
				>
					{line.text}
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-title-md text-onSurfaceVariant">No lyrics available</div>
	{/if}
</div>

<style>
	/* CSS Mask for fading top and bottom */
	.mask-image-gradient {
		mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
