export interface LyricsData {
	plain?: string
	synced?: string
	instrumental: boolean
}

interface LrcLibResponse {
	plainLyrics: string
	syncedLyrics: string
	instrumental: boolean
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
		if (duration) url.searchParams.set('duration', duration.toString())

		const response = await fetch(url.toString())
		if (!response.ok) {
            // fallback search if direct match fails
            if (response.status === 404) {
                 const searchUrl = new URL('https://lrclib.net/api/search')
                 searchUrl.searchParams.set('q', `${artist} ${title}`)
                 const searchRes = await fetch(searchUrl.toString())
                 if(searchRes.ok) {
                     const searchData = await searchRes.json()
                     if(Array.isArray(searchData) && searchData.length > 0) {
                         // Pick the best match, maybe filter by duration if close enough
                         const bestMatch = searchData[0]
                         return {
                             plain: bestMatch.plainLyrics,
                             synced: bestMatch.syncedLyrics,
                             instrumental: bestMatch.instrumental
                         }
                     }
                 }
            }
			return null
		}

		const data: LrcLibResponse = await response.json()
		return {
			plain: data.plainLyrics,
			synced: data.syncedLyrics,
			instrumental: data.instrumental,
		}
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
			const milliseconds = parseInt(match[3].padEnd(3, '0'), 10)
			const time = minutes * 60 + seconds + milliseconds / 1000
			const text = line.replace(timeRegex, '').trim()
			if (text) {
				result.push({ time, text })
			}
		}
	}

	return result
}
