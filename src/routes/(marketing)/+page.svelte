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
		<span class="text-label-md hidden sm:block">Fork of Snae Player</span>
	</div>
	<IconButton
		as="a"
		href="https://github.com/imreallyadi/adi-music"
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
		<div inert class="absolute inset-0 -z-10 overflow-hidden">
			<div class="absolute top-[-10%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"></div>
			<div class="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-tertiary/10 blur-[100px] opacity-60"></div>
            <div class="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[100px] opacity-60"></div>
		</div>

		<div class="content-width flex flex-col items-center text-center">
            <!-- Headline with entrance animation -->
			<h1 class="mb-6 max-w-4xl text-display-md font-normal text-onSurface sm:text-display-lg animate-fade-in-up">
				Your music, <span class="text-primary font-medium relative inline-block">your way</span>
			</h1>

			<p class="mb-10 max-w-2xl text-headline-sm text-onSurfaceVariant animate-fade-in-up delay-100">
				Experience a beautifully designed music player built for your local library. Privacy-focused, fast, and expressive.
			</p>

             <!-- M3 Search Bar Visual Mockup -->
            <div class="relative w-full max-w-lg mb-10 animate-fade-in-up delay-200 group">
                <div class="flex items-center gap-4 h-14 w-full rounded-full bg-surfaceContainerHigh px-6 transition-all duration-300 ease-emphasized shadow-sm hover:shadow-md group-hover:bg-surfaceContainerHighest cursor-default ring-1 ring-transparent focus-within:ring-primary focus-within:bg-surfaceContainerHighest">
                    <Icon type="search" class="text-onSurfaceVariant size-6" />
                    <span class="text-body-lg text-onSurfaceVariant/80 w-full text-left">Search your library...</span>
                </div>
            </div>


			<div class="flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up delay-300">
				<Button as="a" href="/library/tracks" kind="filled" class="h-14! px-8! rounded-full! text-title-md! hover:shadow-lg hover:scale-105 transition-all duration-300 ease-emphasized">
					Start Listening
				</Button>
				<Button as="a" href="https://github.com/imreallyadi/adi-music" target="_blank" kind="outlined" class="h-14! px-8! rounded-full! text-title-md! hover:bg-primary/5 transition-all duration-300 ease-emphasized">
					View Source
				</Button>
			</div>

			<div class="mt-8 text-label-lg text-onSurfaceVariant animate-fade-in-up delay-400">
				Free • No sign-up • Fully offline
			</div>

			<!-- Hero Image -->
			<div class="relative mt-24 w-full max-w-5xl px-4 animate-fade-in-scale delay-500">
				<div class="aspect-16/10 w-full overflow-hidden rounded-[2rem] bg-surfaceContainerHighest shadow-2xl ring-1 ring-outline/10 transition-transform duration-500 hover:scale-[1.01]">
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
	<section class="w-full bg-surfaceContainerLow py-24 rounded-t-[3rem] -mt-10 relative z-10">
		<div class="content-width">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-display-sm text-onSurface">
					Music the way you want it
				</h2>
				<p class="mx-auto max-w-2xl text-headline-sm text-onSurfaceVariant font-light">
					Designed with Material 3 principles for beauty and expressiveness. Features that celebrate your music without compromising your privacy.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each features as feature, i}
					<div
						class="card p-8 rounded-[2rem] bg-surfaceContainer hover:bg-surfaceContainerHigh transition-all duration-300 ease-emphasized hover:-translate-y-2 hover:shadow-xl group"
					>
						<div class="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primaryContainer text-onPrimaryContainer group-hover:scale-110 transition-transform duration-300 ease-emphasized">
							<Icon type={feature.icon} class="size-7" />
						</div>
						<h3 class="mb-3 text-title-lg font-medium text-onSurface">
							{feature.title}
						</h3>
						<p class="text-body-lg text-onSurfaceVariant">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="w-full py-32 bg-surface">
		<div class="content-width">
			<div class="grid items-center gap-20 lg:grid-cols-2">
				<div class="order-2 lg:order-1">
					<h2 class="mb-8 text-display-sm text-onSurface leading-tight">
						Everything you need in one <span class="text-primary">beautiful app</span>
					</h2>
					<ul class="space-y-6">
						{#each benefits as benefit}
							<li class="flex items-start gap-4 group">
								<div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondaryContainer text-onSecondaryContainer group-hover:bg-primary group-hover:text-onPrimary transition-colors duration-300">
									<Icon type="check" class="size-5" />
								</div>
								<span class="text-headline-sm text-onSurfaceVariant group-hover:text-onSurface transition-colors duration-300">{benefit}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="order-1 lg:order-2">
					<div class="relative overflow-hidden rounded-[2.5rem] bg-surfaceContainerHighest shadow-2xl ring-1 ring-outline/10 hover:shadow-3xl transition-shadow duration-500">
						<img
							src={secondaryImg.src}
							width={secondaryImg.width}
							height={secondaryImg.height}
							alt="Feature Illustration"
							class="h-auto w-full object-cover transform hover:scale-105 transition-transform duration-700 ease-emphasized"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="w-full py-24 px-4">
		<div class="content-width">
			<div class="relative overflow-hidden rounded-[3rem] bg-primaryContainer p-12 text-center text-onPrimaryContainer md:p-24 shadow-xl">
                <!-- Decorative circles -->
                <div class="absolute top-0 left-0 w-64 h-64 bg-onPrimaryContainer/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div class="absolute bottom-0 right-0 w-80 h-80 bg-onPrimaryContainer/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

				<h2 class="mb-6 text-display-sm md:text-display-md relative z-10">
					Ready to experience great music?
				</h2>
				<p class="mx-auto mb-12 max-w-xl text-headline-sm opacity-90 relative z-10">
					Start exploring your music collection with a beautifully designed player that respects your privacy and celebrates your music.
				</p>
				<Button as="a" href="/library/tracks" kind="filled" class="bg-primary text-onPrimary hover:shadow-xl hover:scale-105 h-16! px-10! text-title-lg! rounded-full! relative z-10 transition-all duration-300 ease-emphasized">
					Open {m.appName()}
				</Button>
			</div>
		</div>
	</section>
</main>

<footer class="w-full bg-surfaceContainer py-16">
	<div class="content-width flex flex-col items-center justify-between gap-10 md:flex-row">
		<div class="flex items-center gap-4">
			<img src="/icon.png" width="48" height="48" alt="adi music Logo" class="rounded-xl shadow-sm" />
			<div class="flex flex-col">
				<span class="text-title-lg font-medium text-onSurface">{m.appName()}</span>
				<span class="text-body-md text-onSurfaceVariant">Fork of <a href="https://github.com/minht11/snae-player" target="_blank" class="hover:text-primary hover:underline transition-colors">Snae Player</a></span>
			</div>
		</div>

		<div class="flex gap-8">
			<a
				href="https://github.com/imreallyadi/adi-music"
				target="_blank"
				class="flex items-center gap-2 text-label-lg text-onSurfaceVariant hover:text-primary transition-colors hover:bg-surfaceContainerHigh px-4 py-2 rounded-full"
			>
				<Icon type="github" class="size-5" />
				{m.aboutSourceCode()}
			</a>

			<a
				href="https://github.com/imreallyadi/adi-music#privacy"
				target="_blank"
				class="text-label-lg text-onSurfaceVariant hover:text-primary transition-colors hover:bg-surfaceContainerHigh px-4 py-2 rounded-full"
			>
				{m.aboutPrivacy()}
			</a>
		</div>
	</div>
</footer>

<style>
	.content-width {
		width: 100%;
		max-width: 1280px; /* Increased max width slightly */
		padding-left: 24px;
		padding-right: 24px;
		margin-left: auto;
		margin-right: auto;
	}

    /* Custom animations */
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fade-in-up 0.6s var(--ease-emphasized-decelerate) backwards;
    }

    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }

</style>
