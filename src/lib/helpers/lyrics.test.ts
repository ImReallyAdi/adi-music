import { describe, it, expect } from 'vitest'
import { parseSyncedLyrics } from './lyrics.ts'

describe('parseSyncedLyrics', () => {
    it('parses simple synced lyrics', () => {
        const lrc = `[00:12.34]Line 1
[01:05.00]Line 2`
        const result = parseSyncedLyrics(lrc)
        expect(result).toEqual([
            { time: 12.34, text: 'Line 1' },
            { time: 65, text: 'Line 2' }
        ])
    })

    it('parses lyrics with 3 digit milliseconds', () => {
        const lrc = `[00:01.123]Line 1`
        const result = parseSyncedLyrics(lrc)
        expect(result).toEqual([
            { time: 1.123, text: 'Line 1' }
        ])
    })

    it('sorts lines by time', () => {
        const lrc = `[00:02.00]Second
[00:01.00]First`
        const result = parseSyncedLyrics(lrc)
        expect(result).toEqual([
            { time: 1, text: 'First' },
            { time: 2, text: 'Second' }
        ])
    })

    it('ignores invalid lines', () => {
         const lrc = `[invalid]Text
[00:01.00]Valid`
         const result = parseSyncedLyrics(lrc)
         expect(result).toEqual([
             { time: 1, text: 'Valid' }
         ])
    })
})
