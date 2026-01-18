<script lang="ts">
	import type { Track } from '$lib/library/types'

	interface Props {
		track: Track | null
		artworkSrc: string | undefined
		onColorChange?: (color: string) => void
	}

	const { track, artworkSrc, onColorChange }: Props = $props()

	let canvas: HTMLCanvasElement | undefined = $state()
	let dominantColor = $state('rgba(179, 38, 30, 0.15)')

	const extractDominantColor = async (imageSrc: string) => {
		if (!canvas || !imageSrc) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		try {
			const img = new Image()
			img.crossOrigin = 'anonymous'

			await new Promise((resolve, reject) => {
				img.onload = resolve
				img.onerror = reject
				img.src = imageSrc
			})

			// Resize canvas to small size for performance
			canvas.width = 100
			canvas.height = 100

			ctx.drawImage(img, 0, 0, 100, 100)
			const imageData = ctx.getImageData(0, 0, 100, 100)
			const data = imageData.data

			// Simple but effective dominant color extraction
			let r = 0,
				g = 0,
				b = 0
			const pixelCount = data.length / 4

			for (let i = 0; i < data.length; i += 4) {
				// Skip mostly transparent pixels
				if (data[i + 3] > 128) {
					r += data[i]
					g += data[i + 1]
					b += data[i + 2]
				}
			}

			r = Math.floor(r / pixelCount)
			g = Math.floor(g / pixelCount)
			b = Math.floor(b / pixelCount)

			dominantColor = `rgba(${r}, ${g}, ${b}, 0.15)`
			onColorChange?.(dominantColor)
		} catch (err) {
			console.error('Failed to extract color:', err)
		}
	}

	$effect(() => {
		if (artworkSrc) {
			extractDominantColor(artworkSrc)
		}
	})
</script>

<canvas bind:this={canvas} class="hidden" aria-hidden="true"></canvas>

<!-- Provide dominantColor to slotted content -->
<slot {dominantColor} />
