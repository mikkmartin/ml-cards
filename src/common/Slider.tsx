import React, { useState, useEffect } from 'react'
import { motion, transform, useTransform, useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import clamp from 'lodash/clamp'

export default function({ min = 0, max = 1, value = 1, step = 0.001 }) {
  const pos = useMotionValue(value)
  let startPos = 0
  const options = { clamp: false }
  const from = [0, 1]
  const to = [0, 1000]

  function onDrag(ev) {
    const _pos = ev.offsetX - startPos
    const x = transform(_pos, to, from, options)
    const finalX = clamp(x, 0, 1)
    pos.set(finalX)
  }

  return (
    <Slider drag="x" dragElastic={0} dragConstraints={{ left: 0, right: 0 }} onDrag={onDrag}>
      <svg width="100%" height="100%">
        <motion.rect width={useTransform(pos, v => v * 100 + '%')} opacity=".1" height="100%" />
        <motion.rect x={useTransform(pos, v => v * 100 + '%')} width="1" height="100%" />
        <Text min={min} max={max} pos={pos} step={step} />
      </svg>
    </Slider>
  )
}

function Text({ pos, min, max, step }) {
  const [frame, setFrame] = useState(pos.get())
  const decimalPosition = step.toString().split('.')[1].length
  const decimalMultiplier = [...Array(decimalPosition)].reduce((a, b) => a * 10, 1)
  const label = Math.floor(transform(frame, [0, 1], [min, max]) * decimalMultiplier) / decimalMultiplier
  useEffect(() => {
    pos.onChange(v => setFrame(v))
  }, [pos])
  return (
    <text x="12" y="22" fontFamily="SFMono-Regular, SF Mono" fontSize="16" letterSpacing="0.06">
      {label}
    </text>
  )
}

const Slider = styled(motion.div)`
  width: 100%;
  height: 32px;
  svg {
    background: white;
    rect {
      fill: #fdc900;
    }
    text {
      fill: black;
      pointer-events: none;
    }
  }
`
