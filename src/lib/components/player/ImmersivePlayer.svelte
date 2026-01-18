<script lang="ts">
	import { onMount } from 'svelte'
	import Button from '$lib/components/Button.svelte'
	import IconButton from '$lib/components/IconButton.svelte'
	import Icon from '$lib/components/icon/Icon.svelte'
	import PlayerArtwork from '$lib/components/player/PlayerArtwork.svelte'
	import Timeline from '$lib/components/player/Timeline.svelte'
	import Slider from '$lib/components/Slider.svelte'
	import PlayTogglePillButton from '$lib/components/player/buttons/PlayTogglePillButton.svelte'
	import PlayPrevButton from '$lib/components/player/buttons/PlayPrevButton.svelte'
	import PlayNextButton from '$lib/components/player/buttons/PlayNextButton.svelte'
	import ShuffleButton from '$lib/components/player/buttons/ShuffleButton.svelte'
	import RepeatButton from '$lib/components/player/buttons/RepeatButton.svelte'
	import PlayerFavoriteButton from '$lib/components/player/buttons/PlayerFavoriteButton.svelte'
	import ColorExtractor from '$lib/components/player/ColorExtractor.svelte'
	import { formatArtists } from '$lib/helpers/utils/text.ts'
	import './immersive-player.css'

	interface Props {
		onClose?: () => void
	}

	const { onClose }: Props = $props()

	const mainStore = useMainStore()
	const player = usePlayer()
	const track = $derived(player.activeTrack)
	const artworkSrc = $derived(player.artworkSrc)

	let controlsVisible = $state(true)
	let hideControlsTimeout: ReturnType<typeof setTimeout> | null = null
	let container: HTMLElement | undefined = $state()

	// Dynamic background color extracted from artwork
	let bgColor = $state('rgba(179, 38, 30, 0.15)')

	const handleColorExtracted = (color: string) => {
		bgColor = color
	}

	const showControls = () => {
		controlsVisible = true
		resetHideTimer()
	}

	const hideControlsAfterDelay = () => {
		if (player.playing) {
			hideControlsTimeout = setTimeout(() => {
				controlsVisible = false
			}, 4000)
		}
	}

	const resetHideTimer = () => {
		if (hideControlsTimeout) {
			clearTimeout(hideControlsTimeout)
		}
		hideControlsAfterDelay()
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		showControls()

		// Space to play/pause
		if (e.code === 'Space') {
			e.preventDefault()
			player.playing ? player.pause() : player.play()
		}
		// Arrow left/right for seek
		if (e.code === 'ArrowLeft') {
			e.preventDefault()
			player.seek(Math.max(0, player.currentTime - 5))
		}
		if (e.code === 'ArrowRight') {
			e.preventDefault()
			player.seek(Math.min(player.duration, player.currentTime + 5))
		}
		// n for next, p for previous
		if (e.code === 'KeyN') player.next()
		if (e.code === 'KeyP') player.previous()
	}

	const handleMouseMove = () => {
		if (player.playing) {
			showControls()
		}
	}

	const handleTouchStart = () => {
		showControls()
	}

	onMount(() => {
		// Hide controls after delay when playing
		if (player.playing) {
			hideControlsAfterDelay()
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('touchstart', handleTouchStart)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('touchstart', handleTouchStart)
			if (hideControlsTimeout) {
				clearTimeout(hideControlsTimeout)
			}
		}
	})

	// Auto-show/hide controls based on playback state
	$effect(() => {
		if (!player.playing && controlsVisible === false) {
			controlsVisible = true
		}
	})
</script>

<svelte:document on:fullscreenchange={() => {}} />

<ColorExtractor {track} {artworkSrc} onColorChange={handleColorExtracted} let:dominantColor>
	<div
		bind:this={container}
		class="immersive-player bg-black fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
		role="region"
		aria-label="Immersive music player"
	>
		<!-- Dynamic gradient background -->
		<div
			class="absolute inset-0 -z-10 opacity-20 transition-all duration-300"
			style="background: radial-gradient(ellipse at center, {dominantColor}, rgba(0, 0, 0, 0.8))"
		></div>

		<!-- Background blur effect -->
		<div class="absolute inset-0 -z-10 opacity-40 backdrop-blur-3xl"></div>

		<!-- Main content container -->
		<div class="flex h-full w-full flex-col items-center justify-between px-6 py-8">
			<!-- Header with close and favorite buttons -->
			<div
				class={`flex w-full items-center justify-between transition-all duration-300 ${
					controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
			>
				<IconButton
					kind="flat"
					tooltip="Close"
					onclick={onClose}
					class="transition-transform hover:scale-110"
				>
					<Icon type="close" />
				</IconButton>

				<div class="text-label-md tracking-widest text-onSurface/60 uppercase">Now Playing</div>

				<PlayerFavoriteButton class="transition-transform hover:scale-110" />
			</div>

			<!-- Center: Album artwork (main focal point) -->
			<div class="flex min-h-0 flex-1 flex-col items-center justify-center gap-8">
				<!-- Artwork with subtle animation -->
				<div
					class="aspect-square w-full max-w-96 rounded-3xl bg-surfaceContainerHighest shadow-2xl"
				>
					<PlayerArtwork class="h-full w-full rounded-3xl" />
				</div>

				<!-- Track info with optimized spacing -->
				<div
					class={`text-center transition-all duration-300 ${
						controlsVisible
							? 'translate-y-0 opacity-100'
							: 'pointer-events-none translate-y-4 opacity-0'
					}`}
				>
					<h1 class="text-3xl sm:text-4xl mb-3 line-clamp-2 font-bold text-onSurface">
						{track?.name ?? 'No track playing'}
					</h1>
					<p class="text-lg sm:text-xl line-clamp-1 text-onSurfaceVariant">
						{track ? formatArtists(track.artists) : 'No artist'}
					</p>
					{#if track?.album}
						<p class="text-base mt-2 line-clamp-1 text-onSurfaceVariant/80">
							{track.album}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bottom controls section -->
			<div
				class={`w-full max-w-md space-y-8 transition-all duration-300 ${
					controlsVisible
						? 'translate-y-0 opacity-100'
						: 'pointer-events-none translate-y-8 opacity-0'
				}`}
			>
				<!-- Timeline/Seek bar -->
				<div class="space-y-2">
					<Timeline class="w-full" />
				</div>

				<!-- Main playback controls -->
				<div class="flex items-center justify-center gap-6 sm:gap-8">
					<IconButton
						kind="flat"
						icon="shuffleAlt"
						class={`transition-all ${player.shuffle ? 'text-primary' : 'text-onSurfaceVariant'}`}
						onclick={() => (player.shuffle = !player.shuffle)}
					/>

					<PlayPrevButton
						class="h-12 w-12 transition-transform hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
					/>

					<PlayTogglePillButton
						class="h-16 w-16 transition-transform hover:scale-105 active:scale-95 sm:h-20 sm:w-20"
					/>

					<PlayNextButton
						class="h-12 w-12 transition-transform hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
					/>

					<IconButton
						kind="flat"
						class={`transition-all ${
							player.repeat !== 'none' ? 'text-primary' : 'text-onSurfaceVariant'
						}`}
						onclick={() => {
							if (player.repeat === 'none') player.repeat = 'all'
							else if (player.repeat === 'all') player.repeat = 'one'
							else player.repeat = 'none'
						}}
					>
						<Icon
							type={player.repeat === 'one' ? 'repeatOne' : 'repeat'}
							class="transition-transform"
						/>
					</IconButton>
				</div>

				<!-- Volume control -->
				{#if mainStore.volumeSliderEnabled}
					<div class="flex items-center gap-3 px-2">
						<IconButton
							kind="flat"
							icon="volumeLow"
							onclick={() => (player.volume = Math.max(0, player.volume - 10))}
							class="text-onSurfaceVariant transition-colors hover:text-onSurface"
						/>

						<Slider bind:value={player.volume} class="flex-1" aria-label="Volume" />

						<IconButton
							kind="flat"
							icon="volumeHigh"
							onclick={() => (player.volume = Math.min(100, player.volume + 10))}
							class="text-onSurfaceVariant transition-colors hover:text-onSurface"
						/>
					</div>
				{/if}

				<!-- Keyboard hints (subtle) -->
				<div class="text-xs flex justify-center gap-4 text-onSurfaceVariant/40">
					<span class="hidden sm:inline">Space: Play/Pause</span>
					<span class="hidden sm:inline">← →: Seek</span>
					<span class="hidden sm:inline">N/P: Next/Prev</span>
				</div>
			</div>
		</div>
	</div>
</ColorExtractor>

<style>
	.immersive-player {
		/* Prevent scrolling */
		overflow: hidden;
	}

	:global(.immersive-player button) {
		--default-ring: none;
	}

	/* Smooth transitions for all interactive elements */
	:global(.immersive-player .button, .immersive-player .icon-button) {
		transition: all 150ms cubic-bezier(0.2, 0, 0.38, 0.9);
	}

	/* Ensure artwork loads smoothly */
	:global(.immersive-player img) {
		animation: fadeIn 0.6s cubic-bezier(0.2, 0, 0.38, 0.9);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Touch-friendly hit targets */
	:global(.immersive-player button) {
		min-height: 48px;
		min-width: 48px;
	}

	/* Prevent text selection on interactions */
	.immersive-player {
		user-select: none;
		-webkit-user-select: none;
	}
</style>
