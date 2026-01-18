<script module lang="ts">
	import type { AnimationConfig } from 'svelte/animate'
	import { type AnimationSequence, timeline } from '$lib/helpers/animations.ts'
	import Icon, { type IconType } from '../icon/Icon.svelte'

	export interface DialogOpenAccessor<S> {
		get(): S | null
		close(): void
	}

	export interface DialogProps<S> {
		open?: boolean | DialogOpenAccessor<S>
		title?: string
		icon?: IconType
		class?: ClassValue
		children?: Snippet<[{ data: S; close: () => void }]>
	}
</script>

<script lang="ts" generics="S">
	let {
		open = $bindable(false),
		title,
		icon,
		class: className,
		children,
	}: DialogProps<S> = $props()

	const openData = $derived(typeof open === 'object' ? open?.get() : undefined)
	const isOpen = $derived.by(() => {
		if (typeof open === 'object') {
			return openData !== null
		} else {
			return open
		}
	})

	const close = () => {
		if (typeof open === 'object') {
			open.close()
		} else {
			open = false
		}
	}

	let dialogHeader = $state<HTMLElement>()!

	const animateBackdrop = (dialog: HTMLDialogElement, isOut = false) => {
		try {
			dialog.animate(
				{
					opacity: isOut ? [1, 0] : [0, 1],
				},
				{
					pseudoElement: '::backdrop',
					duration: 300,
					easing: 'linear',
					fill: isOut ? 'forwards' : undefined,
				},
			)
		} catch (err) {
			// Firefox does not support pseudo-element animations
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1770591
			if (import.meta.env.DEV) {
				console.warn(err)
			}
		}
	}

	const animateIn = (dialog: HTMLDialogElement) => {
		animateBackdrop(dialog)

		const frames: readonly AnimationSequence[] = [
			[
				dialog,
				{
					opacity: [0, 1],
					transform: ['scale(0.9)', 'scale(1)'],
				},
				{
					duration: 400,
					// Emphasized Decelerate
					easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
				},
			] satisfies AnimationSequence,
		]

		timeline(frames)
	}

	const animateOut = (dialog: HTMLDialogElement) => {
		animateBackdrop(dialog, true)

		const frames: readonly AnimationSequence[] = [
			[
				dialog,
				{
					opacity: [1, 0],
					transform: ['scale(1)', 'scale(0.9)'],
				},
				{
					duration: 200,
					// Emphasized Accelerate
					easing: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
				},
			] satisfies AnimationSequence,
		]

		return timeline(frames)
	}

	const onOpenAction = (dialog: HTMLDialogElement) => {
		dialog.showModal()
		void animateIn(dialog)
	}

	const outAni = (dialog: HTMLDialogElement): AnimationConfig => {
		void animateOut(dialog)

		// TODO. A hack until svelte supports non duration based animations
		return {
			duration: 200,
		}
	}
</script>

{#if isOpen}
	<dialog
		{@attach onOpenAction}
		out:outAni
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				close()
				// We don't want dialog to exit top level
				// and instead remain until the animation is complete
				// and then remove from the DOM
				e.preventDefault()
			}
		}}
		onclose={() => {
			// There is no way to prevent dialog close event
			close()
		}}
		class={[
			'm-auto flex flex-col rounded-3xl bg-surfaceContainerHigh text-onSurface contain-content select-none focus:outline-none elevation-3',
			className,
		]}
	>
		<header
			bind:this={dialogHeader}
			class={['flex flex-col gap-4 px-6 pt-6', icon && 'items-center justify-center text-center']}
		>
			{#if icon}
				<Icon type={icon} class="text-secondary size-6" />
			{/if}

			{#if title}
				<div class="text-headline-sm text-onSurface">{title}</div>
			{/if}
		</header>

		<div class="flex shrink flex-col overflow-hidden">
			{@render children?.({
				data: openData!,
				close,
			})}
		</div>
	</dialog>
{/if}

<style lang="postcss">
	@reference '../../../app.css';

	dialog {
		/*
			We want to allow user of dialog to specify their preferred height
			but keep it inside window bounds
		*/
		max-width: initial !important;
		max-height: min(100% - --spacing(6) * 2, var(--dialog-height, 100%), --spacing(150)) !important;
		width: clamp(
			var(--dialog-width, --spacing(70)),
			var(--dialog-width, --spacing(100)),
			100% - --spacing(8)
		) !important;
		height: max-content !important;
		overscroll-behavior: contain;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.32);
		backdrop-filter: blur(2px);
        animation: fade-in 0.3s linear forwards;
	}

    /* Dialog requires elevation */
</style>
