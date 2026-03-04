import { useEffect, useCallback } from 'react'

interface MediaMetadata {
  title: string
  artist: string
  album: string
  artwork?: { src: string; sizes?: string; type?: string }[]
}

export function useMediaSession() {
  const setMediaMetadata = useCallback((metadata: MediaMetadata | null) => {
    if (!('mediaSession' in navigator)) return

    if (metadata) {
      (navigator.mediaSession as any).metadata = new window.MediaMetadata({
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        artwork: metadata.artwork || []
      })
    }
  }, [])

  const setPlaybackState = useCallback((state: 'playing' | 'paused' | 'none') => {
    if (!('mediaSession' in navigator)) return
    ;(navigator.mediaSession as any).playbackState = state
  }, [])

  const setActionHandler = useCallback((action: string, handler: ((details: any) => void) | null) => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.setActionHandler(action as any, handler)
  }, [])

  useEffect(() => {
    if (!('mediaSession' in navigator)) return

    const actions = ['play', 'pause', 'seekbackward', 'seekforward', 'previoustrack', 'nexttrack']
    actions.forEach(action => {
      navigator.mediaSession.setActionHandler(action as any, null)
    })
  }, [])

  return { setMediaMetadata, setPlaybackState, setActionHandler }
}

export function useShare() {
  const share = useCallback(async (data: { title: string; text?: string; url?: string }) => {
    if (navigator.share && navigator.canShare?.(data)) {
      try {
        await navigator.share(data)
        return true
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          console.warn('Share failed:', e)
        }
        return false
      }
    }
    
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(data.url || data.text || '')
        return true
      } catch {
        return false
      }
    }
    
    return false
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch {
        return false
      }
    }
    return false
  }, [])

  return { share, copyToClipboard }
}
