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
	<Button as="a" href="/library/tracks" kind="filled">Launch Player</Button>
</Header>

<main class="flex w-full flex-col items-center">
	<!-- Hero Section -->
	<section
		class="relative w-full overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32"
	>
		<!-- Background Gradient -->
		<div inert class="absolute inset-0 -z-10">
			<div class="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"></div>
			<div class="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-tertiary/10 blur-[80px]"></div>
		</div>

		<div class="content-width flex flex-col items-center text-center">
			<h1 class="mb-6 max-w-4xl text-display-sm font-normal text-onSurface sm:text-display-md lg:text-display-lg">
				Your music, <span class="text-primary font-medium">your way</span>
			</h1>

			<p class="mb-10 max-w-2xl text-headline-sm text-onSurfaceVariant">
				Experience a beautifully designed music player built for your local library. Privacy-focused, fast, and expressive.
			</p>

			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<Button as="a" href="/library/tracks" kind="filled" class="h-12! px-8! text-title-md!">
					Start Listening
				</Button>
				<Button as="a" href="https://github.com/minht11/local-music-pwa" target="_blank" kind="outlined" class="h-12! px-8! text-title-md!">
					View Source
				</Button>
			</div>

			<div class="mt-6 text-label-lg text-onSurfaceVariant">
				Free • No sign-up • Fully offline
			</div>

			<!-- Hero Image -->
			<div class="relative mt-20 w-full max-w-5xl px-4 animate-fade-in-scale">
				<div class="aspect-16/10 w-full overflow-hidden rounded-3xl bg-surfaceContainerHighest shadow-2xl ring-1 ring-outline/10">
					<img
						src={heroImg.src}
						width={heroImg.width}
						height={heroImg.height}
						alt="adi music Interface"
						class="h-full w-full object-cover object-top"
						loading="eager"
						fetchpriority="high"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="w-full bg-surfaceContainerLow py-24">
		<div class="content-width">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-headline-lg text-onSurface">
					Music the way you want it
				</h2>
				<p class="mx-auto max-w-2xl text-body-lg text-onSurfaceVariant">
					Designed with Material 3 principles for beauty and expressiveness. Features that celebrate your music without compromising your privacy.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each features as feature, i}
					<div
						class="card p-6 animate-fade-in-scale"
						style={`animation-delay: ${i * 100}ms`}
					>
						<div class="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primaryContainer text-onPrimaryContainer">
							<Icon type={feature.icon} class="size-6" />
						</div>
						<h3 class="mb-2 text-title-lg font-medium text-onSurface">
							{feature.title}
						</h3>
						<p class="text-body-md text-onSurfaceVariant">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="w-full py-24">
		<div class="content-width">
			<div class="grid items-center gap-16 lg:grid-cols-2">
				<div class="order-2 lg:order-1">
					<h2 class="mb-8 text-headline-lg text-onSurface">
						Everything you need in one beautiful app
					</h2>
					<ul class="space-y-6">
						{#each benefits as benefit}
							<li class="flex items-start gap-4">
								<div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondaryContainer text-onSecondaryContainer">
									<Icon type="check" class="size-5" />
								</div>
								<span class="text-body-lg text-onSurface">{benefit}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="order-1 lg:order-2">
					<div class="relative overflow-hidden rounded-3xl bg-surfaceContainerHighest shadow-xl ring-1 ring-outline/10">
						<img
							src={secondaryImg.src}
							width={secondaryImg.width}
							height={secondaryImg.height}
							alt="Feature Illustration"
							class="h-auto w-full object-cover"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="w-full py-24">
		<div class="content-width">
			<div class="overflow-hidden rounded-4xl bg-primaryContainer p-12 text-center text-onPrimaryContainer md:p-20">
				<h2 class="mb-6 text-headline-lg">
					Ready to experience great music?
				</h2>
				<p class="mx-auto mb-10 max-w-xl text-body-lg opacity-90">
					Start exploring your music collection with a beautifully designed player that respects your privacy and celebrates your music.
				</p>
				<Button as="a" href="/library/tracks" kind="filled" class="bg-primary text-onPrimary hover:shadow-lg">
					Open {m.appName()}
				</Button>
			</div>
		</div>
	</section>
</main>

<footer class="w-full bg-surfaceContainer py-12">
	<div class="content-width flex flex-col items-center justify-between gap-8 md:flex-row">
		<div class="flex items-center gap-3">
			<img src="/icon.png" width="32" height="32" alt="adi music Logo" class="rounded-full" />
			<div class="flex flex-col">
				<span class="text-title-md font-medium text-onSurface">{m.appName()}</span>
				<span class="text-body-sm text-onSurfaceVariant">Fork of <a href="https://github.com/minht11/snae-player" target="_blank" class="hover:underline">Snae Player</a></span>
			</div>
		</div>

		<div class="flex gap-8">
			<a
				href="https://github.com/minht11/local-music-pwa"
				target="_blank"
				class="flex items-center gap-2 text-label-lg text-onSurfaceVariant hover:text-primary"
			>
				<Icon type="github" class="size-5" />
				{m.aboutSourceCode()}
			</a>

			<a
				href="https://github.com/minht11/local-music-pwa#privacy"
				target="_blank"
				class="text-label-lg text-onSurfaceVariant hover:text-primary"
			>
				{m.aboutPrivacy()}
			</a>
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
</style>
