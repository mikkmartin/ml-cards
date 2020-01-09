import React, { createContext, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import Video from './Video'
import Slider from './Slider'
import PlayControls from './PlayControls'

export const Context = createContext(null)
export default function({ progress = useMotionValue(0) }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [temporarylyPaused, setTemporarylyPaused] = useState(false)
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
        <Video />
        <Slider />
      </Container>
    </Context.Provider>
  )
}

const Container = styled(motion.div)`
  width: 375px;
  position: relative;
  background: #3e3e3e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  video {
    width: 100%;
    height: auto;
  }
`
