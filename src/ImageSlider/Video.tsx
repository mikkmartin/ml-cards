import React, { useEffect, useContext, forwardRef } from 'react'
import { transform } from 'framer-motion'
import { Context } from './index'

let interval = null
export default forwardRef((props, ref: any) => {
  const { pos, isPlaying, setIsPlaying, temporarylyPaused } = useContext(Context)
  const posToTime = val => transform(val, [0, 1], [0, ref.current.duration])

  useEffect(() => {
    const vid = ref.current
    function update() {
      if (vid.currentTime === vid.duration) {
        setTimeout(() => setIsPlaying(false), 1)
      }
    }
    vid.addEventListener('timeupdate', update)
    return () => vid.removeEventListener('timeupdate', update)
  }, [isPlaying, setIsPlaying])

  useEffect(() => {
    if (isPlaying && !temporarylyPaused && ref.current) {
      ref.current.play()
      animate()
    } else {
      ref.current.pause()
      cancelAnimationFrame(interval)
    }

    function animate() {
      if (ref.current) {
        const normalized = transform(ref.current.currentTime, [0, ref.current.duration], [0, 1])
        if (!isNaN(normalized)) pos.set(normalized)
        interval = requestAnimationFrame(animate)
      }
    }
  }, [isPlaying, temporarylyPaused, pos])

  useEffect(() => {
    const onPosChange = p => {
      if (temporarylyPaused && ref.current) {
        const t = posToTime(p)
        ref.current.currentTime = t
      }
    }
    const unsubscribe = pos.onChange(onPosChange)
    return () => unsubscribe()
  }, [temporarylyPaused, pos])

  return (
    <video ref={ref} width="100%" height="100%">
      <source src="ml-recording.mov" type="video/mp4" />
    </video>
  )
})
