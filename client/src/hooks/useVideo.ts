import { useRef, useCallback } from 'react'
import { PlyrInstance, APITypes } from 'plyr-react'
import Hls from 'hls.js'

export const usePlayVideo = () => {
  const refPlyr = useRef<APITypes>(null)

  const loadVideo = useCallback((src: string) => {
    const video = document.getElementById('plyr') as HTMLVideoElement
    const hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(video)
    refPlyr.current!.plyr.media = video

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      (refPlyr.current!.plyr as PlyrInstance).play()
    })
  }, [])

  return {
    refPlyr,
    loadVideo,
  }
}
