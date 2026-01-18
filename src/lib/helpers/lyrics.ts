export interface LyricsData {
	plain?: string
	synced?: string
	instrumental: boolean
}

interface LrcLibResponse {
	plainLyrics: string
	syncedLyrics: string
	instrumental: boolean
	duration: number
}

export const fetchLyrics = async (
	artist: string,
	title: string,
	album?: string,
	duration?: number,
): Promise<LyricsData | null> => {
	try {
		const url = new URL('https://lrclib.net/api/get')
		url.searchParams.set('artist_name', artist)
		url.searchParams.set('track_name', title)
		if (album) url.searchParams.set('album_name', album)
		if (duration) url.searchParams.set('duration', Math.round(duration).toString())

		const response = await fetch(url.toString())

		if (response.ok) {
			const data: LrcLibResponse = await response.json()
			return {
				plain: data.plainLyrics,
				synced: data.syncedLyrics,
				instrumental: data.instrumental,
			}
		}

		// Fallback search if direct match fails
		if (response.status === 404) {
			const searchUrl = new URL('https://lrclib.net/api/search')
			searchUrl.searchParams.set('q', `${artist} ${title}`)

			const searchRes = await fetch(searchUrl.toString())
			if (searchRes.ok) {
				const searchData = await searchRes.json()
				if (Array.isArray(searchData) && searchData.length > 0) {
					// Find best match based on duration if available
					let bestMatch = searchData[0]

					if (duration) {
						// Look for a match with duration within 2 seconds
						const durationMatch = searchData.find((item: LrcLibResponse) =>
							Math.abs(item.duration - duration) < 2
						)
						if (durationMatch) {
							bestMatch = durationMatch
						}
					}

					return {
						plain: bestMatch.plainLyrics,
						synced: bestMatch.syncedLyrics,
						instrumental: bestMatch.instrumental
					}
				}
			}
		}

		return null
	} catch (error) {
		console.error('Failed to fetch lyrics:', error)
		return null
	}
}

export interface SyncedLine {
	time: number
	text: string
}

export const parseSyncedLyrics = (lrc: string): SyncedLine[] => {
	const lines = lrc.split('\n')
	const result: SyncedLine[] = []
	const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

	for (const line of lines) {
		const match = timeRegex.exec(line)
		if (match) {
			const minutes = parseInt(match[1], 10)
			const seconds = parseInt(match[2], 10)
			// Handle 2 or 3 digit milliseconds
			const msStr = match[3]
			const milliseconds = parseInt(msStr.padEnd(3, '0'), 10)

			const time = minutes * 60 + seconds + milliseconds / 1000
			const text = line.replace(timeRegex, '').trim()

			// Some LRC files have empty lines for pauses, we can keep them or skip
			// Keeping them might be good for visual spacing, but for now we skip empty text
			if (text) {
				result.push({ time, text })
			}
		}
	}

	result.sort((a, b) => a.time - b.time)
	return result
}
