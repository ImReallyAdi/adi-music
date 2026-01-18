<script lang="ts">
	import { page } from '$app/state'
	import Button from '$lib/components/Button.svelte'
	import Header from '$lib/components/Header.svelte'
	import IconButton from '$lib/components/IconButton.svelte'
	import Icon, { type IconType } from '$lib/components/icon/Icon.svelte'
	import heroImg from './assets/hero.avif?as=metadata'
	import secondaryImg from './assets/secondary.avif?as=metadata'

	interface Feature {
		icon: IconType
		title: string
		description: string
	}

	const features: Feature[] = [
		{
			icon: 'palette',
			title: 'Dynamic theming',
			description:
				'Material 3 inspired design that adapts to your music artwork with stunning color harmonies and smooth transitions.',
		},
		{
			icon: 'flash',
			title: 'Blazingly fast',
			description:
				'Optimized performance with instant loading, seamless playback, and responsive controls for modern browsers.',
		},
		{
			icon: 'cellphone',
			title: 'Works everywhere',
			description:
				'Experience adi music on your phone, tablet, or desktop. Open in your browser—no downloads, no complications.',
		},
		{
			icon: 'lock',
			title: 'Privacy by design',
			description:
				'Your music stays on your device. No tracking, no accounts, no compromise. Just you, your music, and your privacy.',
		},
	]

	const benefits = [
		'Browse and discover with intelligent search and advanced filters',
		'Create custom playlists for every mood, moment, and occasion',
		'Control playback with keyboard shortcuts and native media keys',
		'Works completely offline—your music, always accessible',
		'Syncs playback state across your devices seamlessly',
	]
</script>

<svelte:head>
	<title>{m.appName()} - Your Music, Your Way</title>
	<meta
		name="description"
		content="adi music: A fork of Snae Player—a privacy-first, high-performance music player for your local library. Designed with Material 3 principles for a beautiful, expressive experience."
	/>

	<link rel="canonical" href={page.url.href} />
</svelte:head>

<Header title={m.appName()} noBackButton mode="fixed-no-spacer">
	<div class="flex items-center gap-2 text-body-md text-onSurfaceVariant">
		<span class="text-label-md">A fork of Snae Player</span>
	</div>
	<IconButton
		as="a"
		href="https://github.com/minht11/local-music-pwa"
		target="_blank"
		kind="flat"
		tooltip="View source code on GitHub"
	>
		<Icon type="github" />
	</IconButton>
	<Button as="a" href="/library/tracks" kind="outlined">Launch Player</Button>
</Header>

<section
	class="content-width-using-grid relative justify-items-center overflow-hidden px-6 pt-24 pb-0 lg:pt-32 lg:pb-24"
>
	<div inert class="animated-gradient absolute -inset-x-32 -inset-y-16"></div>

	<div class="relative z-0 mt-(--app-header-height) max-w-4xl text-center">
		<h1 class="mb-6 text-headline-md leading-tight font-bold text-onSurface lg:text-headline-lg">
			Your music, <span class="text-primary">your way</span>
		</h1>
		<p
			class="mx-auto mb-8 max-w-2xl text-title-md leading-relaxed text-onSurfaceVariant sm:text-title-lg"
		>
			Experience a beautifully designed music player built for your local library. Privacy-focused, fast, and
			expressive—just like your music deserves.
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button as="a" href="/library/tracks" kind="filled" class="w-full sm:w-60">
				Start Listening
			</Button>
			<div class="text-body-md text-onSurfaceVariant">Free • No sign-up • Fully offline</div>
		</div>
	</div>

	<img
		class="hero-image-slide-in relative mt-16 flex aspect-7/5 h-100 w-auto max-w-full items-center justify-center rounded-2xl bg-surfaceContainerHighest object-cover object-left-bottom ring ring-outline/10 sm:h-120"
		src={heroImg.src}
		width={heroImg.width}
		height={heroImg.height}
		alt="App Screenshot"
		loading="eager"
		fetchpriority="high"
	/>
</section>

<section class="content-width py-20">
	<div class="mb-16 text-center">
		<h2 class="mb-4 text-headline-md font-bold text-onSurface sm:text-headline-md">
			Music the way you want it
		</h2>
		<p class="mx-auto max-w-xl text-title-md text-onSurfaceVariant">
			Designed with Material 3 principles for beauty and expressiveness. Features that celebrate your music without compromising
			your privacy.
		</p>
	</div>

	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
		{#each features as feature}
			<div
				class="card group relative overflow-hidden p-8 transition-all duration-300 hover:bg-inverseSurface hover:shadow-2xl"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<div class="relative z-10">
					<div
						class="mb-6 flex size-12 items-center justify-center rounded-full bg-tertiaryContainer transition-transform duration-300 group-hover:scale-110"
					>
						<Icon type={feature.icon} class="text-primary" />
					</div>
					<h3
						class="mb-3 text-title-lg font-semibold text-onSurface transition-colors duration-300 group-hover:text-inverseOnSurface"
					>
						{feature.title}
					</h3>
					<p
						class="text-body-lg leading-relaxed text-onSurfaceVariant transition-colors duration-300 group-hover:text-inverseOnSurface"
					>
						{feature.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="bg-surfaceContainer py-20">
	<div class="content-width">
		<div class="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
			<div>
				<h2 class="mb-6 text-headline-md font-bold text-onSurface sm:text-headline-md">
					Everything you need in one beautiful app
				</h2>
				<ul class="space-y-4">
					{#each benefits as benefit}
						<li class="group flex items-center gap-4 transition-all duration-300">
							<div class="relative">
								<div class="rounded-full bg-primary/10 p-2 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
									<Icon type="check" class="text-primary transition-colors duration-300 group-hover:text-onPrimary" />
								</div>
								<div class="absolute inset-0 rounded-full bg-primary/20 opacity-0 scale-150 animate-pulse group-hover:opacity-0"></div>
							</div>
							<span class="text-body-lg text-onSurfaceVariant transition-colors duration-300 group-hover:text-onSurface">{benefit}</span>
						</li>
					{/each}
				</ul>
			</div>
			<img
				class="flex w-full items-center justify-center rounded-2xl bg-surfaceContainerHigh object-contain object-bottom ring ring-outline/10 transition-transform duration-300 hover:scale-105"
				src={secondaryImg.src}
				width={secondaryImg.width}
				height={secondaryImg.height}
				alt="Feature Illustration"
				loading="lazy"
			/>
		</div>
	</div>
</section>

<section class="content-width py-20">
	<div class="mx-auto max-w-xl text-center">
		<h2 class="mb-6 text-headline-md font-bold text-onSurface sm:text-headline-md">
			Ready to experience great music?
		</h2>
		<p class="mb-8 text-title-md text-onSurfaceVariant">
			Start exploring your music collection with a beautifully designed player that respects your privacy and celebrates your music.
		</p>
		<Button as="a" href="/library/tracks" kind="filled">
			Open {m.appName()}
		</Button>
	</div>
</section>

<footer class="content-width py-8">
	<div class="w-full rounded-4xl bg-gradient-to-br from-surfaceContainerHigh to-surfaceContainerHighest p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl">
		<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<div class="flex items-center gap-3 text-title-md font-medium text-onSurface">
				<img src="/icons/responsive.svg" width="24" height="24" alt="adi music Logo" class="size-6 transition-transform duration-300 hover:scale-110" />
				<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{m.appName()}</span>
				<span class="text-body-sm text-onSurfaceVariant">• Fork of <a href="https://github.com/minht11/snae-player" target="_blank" class="link text-primary hover:underline">Snae Player</a></span>
			</div>

			<div class="flex items-center gap-6 text-body-md">
				<a
					href="https://github.com/minht11/local-music-pwa"
					target="_blank"
					class="link flex items-center gap-2 text-onSurfaceVariant transition-all duration-200 hover:text-primary hover:scale-105"
				>
					<Icon type="github" class="h-5 w-5" />
					{m.aboutSourceCode()}
				</a>

				<a
					href="https://github.com/minht11/local-music-pwa#privacy"
					target="_blank"
					class="link text-onSurfaceVariant transition-all duration-200 hover:text-primary hover:scale-105"
				>
					{m.aboutPrivacy()}
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.content-width {
		width: 100%;
		max-width: 1200px;
		padding-left: 24px;
		padding-right: 24px;
		margin-left: auto;
		margin-right: auto;
	}

	.content-width-using-grid {
		display: grid;
		grid-template-columns: minmax(0, var(--content-max-width));
		justify-content: center;
	}

	.card {
		transition: all var(--ease-standard) 0.3s;
		border-radius: 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary);
	}

	.hero-image-slide-in {
		animation: hero-image-slide-in 0.6s var(--ease-outgoing40) forwards;
	}

	@keyframes hero-image-slide-in {
		0% {
			transform: translateY(48px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animated-gradient {
		background: radial-gradient(
			ellipse 1400px 800px at 0% 30%,
			--alpha(var(--color-tertiary) / 0.15),
			--alpha(var(--color-tertiary) / 0.08),
			transparent 60%
		);
		filter: blur(16px);
		transform-origin: top;
		animation: glow-pulse 24s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0% {
			transform: scale(0.9, 1);
			opacity: 0.6;
		}
		50% {
			transform: scale(1.5, 1);
			opacity: 1;
		}
		100% {
			transform: scale(0.9, 1);
			opacity: 0.6;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-image-slide-in,
		.animated-gradient,
		.card,
		.group {
			animation: none;
			transition: none;
		}
	}
</style>
