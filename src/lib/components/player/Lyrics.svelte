<script lang="ts">
	import { usePlayer } from '$lib/stores/player/use-store.ts'
	import { fetchLyrics, parseSyncedLyrics, type SyncedLine } from '$lib/helpers/lyrics.ts'
	import { formatArtists } from '$lib/helpers/utils/text.ts'
	import Icon from '$lib/components/icon/Icon.svelte'
	import { fade } from 'svelte/transition'

	const player = usePlayer()

	let lyrics = $state<SyncedLine[] | string | null>(null)
	let loading = $state(false)
	let instrumental = $state(false)
	let currentLineIndex = $state(-1)
	let container = $state<HTMLElement | null>(null)

	let lastTrackId = $state<number | null>(null)

	$effect(() => {
		const track = player.activeTrack
		if (!track) {
			lyrics = null
			instrumental = false
			return
		}

		if (track.id === lastTrackId) return
		lastTrackId = track.id

		loading = true
		lyrics = null
		instrumental = false

		fetchLyrics(formatArtists(track.artists), track.name, track.album, track.duration)
			.then((data) => {
				if (data) {
					if (data.instrumental) {
						instrumental = true
						lyrics = null
					} else if (data.synced) {
						lyrics = parseSyncedLyrics(data.synced)
					} else {
						lyrics = data.plain || null
					}
				} else {
					lyrics = null
				}
			})
			.finally(() => {
				loading = false
			})
	})

	$effect(() => {
		if (Array.isArray(lyrics) && !instrumental) {
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
				// Auto-scroll
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

<div class="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center p-4">
	{#if loading}
		<div class="flex flex-col items-center gap-4 animate-pulse" in:fade>
			<div class="h-8 w-48 rounded-full bg-surfaceVariant/50"></div>
			<div class="h-6 w-32 rounded-full bg-surfaceVariant/30"></div>
		</div>
	{:else if instrumental}
		<div class="flex flex-col items-center justify-center gap-4 text-onSurfaceVariant" in:fade>
			<Icon type="musicNote" class="size-16 opacity-50" />
			<div class="text-headline-sm">Instrumental</div>
		</div>
	{:else if typeof lyrics === 'string'}
		<div
			class="scrollbar-hide h-full w-full overflow-y-auto whitespace-pre-line text-body-lg text-onSurface px-4 py-8"
			in:fade
		>
			{lyrics}
		</div>
	{:else if Array.isArray(lyrics)}
		<div
			bind:this={container}
			class="scrollbar-hide flex h-full w-full flex-col items-center overflow-y-auto py-[50vh] mask-image-gradient"
			in:fade
		>
			{#each lyrics as line, i}
				<div
					class="my-3 max-w-3xl cursor-pointer px-4 transition-all duration-300 ease-out select-none
                    {i === currentLineIndex
						? 'scale-105 text-headline-sm font-bold text-primary opacity-100'
						: 'scale-95 text-title-md text-onSurfaceVariant opacity-40 blur-[0.5px] hover:opacity-70 hover:blur-none'}"
					onclick={() => player.seek(line.time)}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && player.seek(line.time)}
					role="button"
					tabindex="0"
				>
					{line.text}
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center gap-2 text-onSurfaceVariant/60" in:fade>
			<Icon type="lyrics" class="size-12 opacity-50" />
			<div class="text-title-md">No lyrics available</div>
		</div>
	{/if}
</div>

<style>
	/* CSS Mask for fading top and bottom */
	.mask-image-gradient {
		mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
