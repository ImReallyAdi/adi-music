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
			title: 'Dynamic Theming',
			description:
				'Material Design 3 styles that adapt to your music artwork, creating a personal and immersive experience.',
		},
		{
			icon: 'flash',
			title: 'Blazingly Fast',
			description:
				'Instant loading, seamless playback, and responsive controls. Built for performance on modern browsers.',
		},
		{
			icon: 'cellphone',
			title: 'Universal Access',
			description:
				'Works on your phone, tablet, or desktop. No installs needed—just open in your browser and play.',
		},
		{
			icon: 'lock',
			title: 'Privacy First',
			description:
				'Your music never leaves your device. No tracking, no accounts, just you and your local library.',
		},
	]

	const benefits = [
		'Intelligent search and advanced filtering',
		'Custom playlists for every mood',
		'Keyboard shortcuts & media key support',
		'Works completely offline',
		'Seamless cross-device state sync',
	]
</script>

<svelte:head>
	<title>{m.appName()} - Local Music Reimagined</title>
	<meta
		name="description"
		content="Adi Music: A stunning, privacy-first local music player. Material Design 3, dynamic theming, and offline playback in your browser."
	/>
	<link rel="canonical" href={page.url.href} />
</svelte:head>

<Header title={m.appName()} noBackButton mode="fixed-no-spacer">
	<div class="hidden sm:flex items-center gap-2 text-body-md text-onSurfaceVariant mr-4">
		<span class="text-label-md">Fork of Snae Player</span>
	</div>
	<IconButton
		as="a"
		href="https://github.com/minht11/local-music-pwa"
		target="_blank"
		kind="blank"
		tooltip="View source on GitHub"
	>
		<Icon type="github" />
	</IconButton>
	<Button as="a" href="/library/tracks" kind="filled">Launch Player</Button>
</Header>

<div class="flex flex-col min-h-screen bg-surface text-onSurface overflow-x-hidden">
	<!-- Hero Section -->
	<section class="relative pt-32 pb-20 px-6 lg:pt-40 lg:pb-32">
		<!-- Background Elements -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60"></div>
		<div class="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 pointer-events-none opacity-40"></div>

		<div class="max-w-4xl mx-auto text-center space-y-8 animate-fade-scale-in">
			<h1 class="text-display-sm sm:text-display-md lg:text-display-lg font-bold tracking-tight text-onSurface leading-tight">
				Your Music, <br class="sm:hidden" />
				<span class="text-primary">Reimagined.</span>
			</h1>
			<p class="text-headline-sm text-onSurfaceVariant max-w-2xl mx-auto leading-relaxed">
				Experience a beautifully designed, privacy-focused music player for your local library.
				Built with Material Design 3.
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
				<Button as="a" href="/library/tracks" kind="filled" class="h-12 px-8 w-full sm:w-auto text-title-md rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
					Start Listening
				</Button>
				<Button as="a" href="https://github.com/minht11/local-music-pwa" target="_blank" kind="toned" class="h-12 px-8 w-full sm:w-auto text-title-md rounded-full">
					<Icon type="github" class="mr-2 size-5" />
					View Source
				</Button>
			</div>

            <div class="pt-8 text-label-lg text-onSurfaceVariant/80 flex items-center justify-center gap-6">
                <span class="flex items-center gap-2"><Icon type="check" class="size-4 text-primary" /> Free & Open Source</span>
                <span class="flex items-center gap-2"><Icon type="check" class="size-4 text-primary" /> No Signup</span>
                <span class="flex items-center gap-2"><Icon type="check" class="size-4 text-primary" /> Offline</span>
            </div>
		</div>

		<!-- Hero Image -->
		<div class="mt-20 max-w-5xl mx-auto relative group animate-fade-scale-in" style="animation-delay: 0.2s; opacity: 0;">
			<div class="absolute -inset-1 bg-gradient-to-r from-primary to-tertiary rounded-3xl opacity-20 blur-2xl transition duration-500 group-hover:opacity-30"></div>
			<img
				src={heroImg.src}
				width={heroImg.width}
				height={heroImg.height}
				class="relative rounded-2xl sm:rounded-3xl shadow-2xl border border-outline-variant/20 w-full h-auto bg-surfaceContainer"
				alt="App Screenshot"
				loading="eager"
			/>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-24 px-6 bg-surfaceContainerLow/50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-headline-md sm:text-headline-lg font-bold text-onSurface mb-4">Why Adi Music?</h2>
				<p class="text-title-lg text-onSurfaceVariant max-w-2xl mx-auto">
					Designed to be the best home for your local music collection.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
				{#each features as feature}
					<div class="group bg-surfaceContainer hover:bg-surfaceContainerHigh rounded-3xl p-8 transition-all duration-300 border border-transparent hover:border-outline-variant hover:shadow-lg">
						<div class="mb-6 size-14 rounded-2xl bg-secondaryContainer text-onSecondaryContainer flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
							<Icon type={feature.icon} class="size-7" />
						</div>
						<h3 class="text-headline-sm font-semibold mb-3 text-onSurface">{feature.title}</h3>
						<p class="text-body-lg text-onSurfaceVariant leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="py-24 px-6 overflow-hidden">
		<div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
			<div class="order-2 lg:order-1">
				<h2 class="text-headline-md sm:text-headline-lg font-bold text-onSurface mb-8">
					Everything you need, <br />
					<span class="text-primary">nothing you don't.</span>
				</h2>
				<ul class="space-y-6">
					{#each benefits as benefit}
						<li class="flex items-center gap-4 group">
							<div class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-onPrimary transition-colors duration-300">
								<Icon type="check" class="size-5" />
							</div>
							<span class="text-title-lg text-onSurfaceVariant group-hover:text-onSurface transition-colors">{benefit}</span>
						</li>
					{/each}
				</ul>

                <div class="mt-10">
                    <Button as="a" href="/library/tracks" kind="filled" class="rounded-full h-12 px-8">
                        Try It Now
                    </Button>
                </div>
			</div>

            <div class="order-1 lg:order-2 relative">
                <div class="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl -z-10"></div>
                <img
                    src={secondaryImg.src}
                    width={secondaryImg.width}
                    height={secondaryImg.height}
                    class="rounded-3xl shadow-2xl border border-outline-variant/20 w-full h-auto rotate-1 hover:rotate-0 transition-transform duration-500"
                    alt="Features Illustration"
                    loading="lazy"
                />
            </div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-12 px-6 bg-surfaceContainer">
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
			<div class="flex items-center gap-3">
				<img src="/icons/responsive.svg" width="32" height="32" alt="Logo" class="opacity-80" />
				<span class="text-title-lg font-bold text-onSurface">{m.appName()}</span>
			</div>

			<div class="flex flex-wrap justify-center gap-8 text-title-sm text-onSurfaceVariant">
				<a href="https://github.com/minht11/local-music-pwa" target="_blank" class="hover:text-primary transition-colors">GitHub</a>
				<a href="https://github.com/minht11/local-music-pwa/blob/main/LICENSE.txt" target="_blank" class="hover:text-primary transition-colors">License</a>
				<a href="https://github.com/minht11/snae-player" target="_blank" class="hover:text-primary transition-colors">Credits</a>
			</div>

            <div class="text-body-sm text-onSurfaceVariant/60">
                &copy; {new Date().getFullYear()} Adi Music
            </div>
		</div>
	</footer>
</div>

<style>
    /* Custom utility overrides or specific animations if needed */
</style>
