import JSZip from 'jszip'

const supportedExtensions = ['aac', 'mp3', 'ogg', 'wav', 'flac', 'm4a', 'opus', 'webm']

export const extractZip = async (
	file: File,
	onProgress?: (percent: number) => void,
): Promise<File[]> => {
	const zip = new JSZip()
	const loadedZip = await zip.loadAsync(file)
	const files: File[] = []

	const entries = Object.entries(loadedZip.files).filter(([_, entry]) => !entry.dir)
	const total = entries.length
	let processed = 0

	for (const [filename, entry] of entries) {
		const lowerName = filename.toLowerCase()
		// Basic filtering for audio files and ignoring hidden/system files
		if (
			!lowerName.startsWith('__macosx') &&
			!lowerName.startsWith('.') &&
			supportedExtensions.some((ext) => lowerName.endsWith(`.${ext}`))
		) {
			const blob = await entry.async('blob')
			const name = filename.split('/').pop() ?? filename
			// Attempt to guess mime type based on extension if blob.type is empty
			let type = blob.type
			if (!type) {
				if (lowerName.endsWith('mp3')) type = 'audio/mpeg'
				else if (lowerName.endsWith('flac')) type = 'audio/flac'
				else if (lowerName.endsWith('wav')) type = 'audio/wav'
				else if (lowerName.endsWith('ogg')) type = 'audio/ogg'
				else if (lowerName.endsWith('m4a')) type = 'audio/mp4'
				else if (lowerName.endsWith('webm')) type = 'audio/webm'
                else if (lowerName.endsWith('aac')) type = 'audio/aac'
			}

			const audioFile = new File([blob], name, { type })
			files.push(audioFile)
		}
		processed++
		if (onProgress) onProgress((processed / total) * 100)
	}

	return files
}
