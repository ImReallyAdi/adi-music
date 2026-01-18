<script lang="ts">
	interface Props {
		min?: number
		max?: number
		value: number
		disabled?: boolean
		onSeekStart?: () => void
		onSeekEnd?: () => void
		class?: string
	}

	let {
		min = 0,
		max = 100,
		value = $bindable(0),
		disabled,
		onSeekStart,
		onSeekEnd,
		class: className,
	}: Props = $props()

	const progressPercentage = $derived.by(() => {
		const range = max - min
		const percentage = range === 0 ? 0 : ((value || 0) - min) * 100 / range
		return Number.isFinite(percentage) ? percentage : 0
	})
</script>

<div class={['relative flex h-8 w-full select-none items-center touch-none group', className]}>
	<input
		type="range"
		bind:value
		{disabled}
		{min}
		{max}
		class="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
		onpointerdown={() => onSeekStart?.()}
		onpointerup={() => onSeekEnd?.()}
		ontouchstart={() => onSeekStart?.()}
		ontouchend={() => onSeekEnd?.()}
	/>

	<!-- Track Background -->
	<div
		class="pointer-events-none absolute h-1 w-full rounded-full bg-surfaceVariant overflow-hidden"
	>
		<!-- Active Track -->
		<div
			class="h-full bg-primary transition-all duration-75 ease-linear"
			style={`width: ${progressPercentage}%`}
		></div>
	</div>

	<!-- Thumb -->
	<div
		class="pointer-events-none absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary shadow-sm transition-all duration-200 ease-emphasized scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-active:scale-125 group-focus-within:opacity-100 group-focus-within:scale-100"
		style={`left: ${progressPercentage}%`}
	>
        <div class="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 group-active:opacity-30 -m-2 transition-opacity"></div>
    </div>
</div>
