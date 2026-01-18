import { THEME_PALLETTE_DARK } from '../../../server/theme-colors.ts'

export const prerender = true

const manifest = {
	short_name: m.appNameShort(),
	name: m.appName(),
	start_url: './library/tracks/',
	scope: '../',
	theme_color: THEME_PALLETTE_DARK.surface,
	background_color: THEME_PALLETTE_DARK.surface,
	display: 'standalone',
	orientation: 'any',
	description: 'adi music - A privacy-first, high-performance music player with Material 3 design for your local library.',
	icons: [
		{
			src: '/icons/raster-192.png',
			sizes: '192x192',
			type: 'image/png',
			purpose: 'any',
		},
		{
			src: '/icons/responsive.svg',
			type: 'image/svg+xml',
			sizes: 'any',
			purpose: 'any',
		},
		{
			src: '/icons/maskable.svg',
			type: 'image/svg+xml',
			sizes: 'any',
			purpose: 'maskable',
		},
	],
}

export const GET = () => {
	return new Response(JSON.stringify(manifest), {
		headers: {
			'Content-Type': 'application/manifest+json',
		},
	})
}
