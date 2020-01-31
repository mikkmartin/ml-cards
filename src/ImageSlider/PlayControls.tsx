import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Context } from './index'

export default function() {
  const { isPlaying, setIsPlaying } = useContext(Context)
  return (
    <Svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      initial="default"
      animate={isPlaying ? 'pause' : 'play'}
      whileHover="hovered"
      whileTap="tapped"
      onClick={() => setIsPlaying(!isPlaying)}
      transition={transition}>
      <motion.rect
        width="100%"
        height="100%"
        fill="rgba(0,0,0,0.15)"
        variants={{
          default: { opacity: 0 },
          hovered: { opacity: 1 }
        }}
      />
      <motion.path
        fill="#FFF"
        fill-rule="nonzero"
        d={isPlaying ? 'M178 173h16v55h-16zM207 173h16v55h-16z' : 'M181 173l45 27.5-45 27.5z'}
        variants={{
          default: { scale: 0.8, fill: 'rgba(255,255,255,0)' },
          hovered: { scale: 1.2, fill: 'rgba(255,255,255,1)' },
          tapped: { scale: 1 }
        }}
      />
    </Svg>
  )
}

const transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.5
}

const Svg = styled(motion.svg)`
  cursor: pointer;
  z-index: 2;
  position: absolute;
  width: 100%;
  height: auto;
  overflow: hidden;
  svg {
    width: 100%;
    height: auto;
  }
`
