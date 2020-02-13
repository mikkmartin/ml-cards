import React, { createContext, useState, forwardRef, useRef, Ref } from 'react'
import { motion, useMotionValue, MotionValue } from 'framer-motion'
import styled from 'styled-components'
import Video from './Video'
import Slider from './Slider'
import PlayControls from './PlayControls'

export const Context = createContext(null)
export default forwardRef(({ progress = useMotionValue(0) }: { progress: MotionValue }, item: Ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [temporarylyPaused, setTemporarylyPaused] = useState(false)
  const ref = useRef(null)

  item.current = () => {
    setIsPlaying(true)
    setTemporarylyPaused(false)
    ref.current.currentTime = 0
    ref.current.play()
  }

  return (
    <Context.Provider
      value={{
        isPlaying,
        setIsPlaying,
        temporarylyPaused,
        setTemporarylyPaused,
        pos: progress
      }}>
      <Container>
        <PlayControls />
        <Video ref={ref} />
        <Slider />
      </Container>
    </Context.Provider>
  )
})

const Container = styled(motion.div)`
  width: 100%;
  height: auto;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
`
