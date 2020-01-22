import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

export default function({ selected, setSelected, items }) {
  function classNames(selected, id) {
    return [selected === id ? 'selected' : '', id % 2 ? 'odd' : ''].join(' ')
  }

  return (
    <List width="100%" height={items.length * 32 + 'px'}>
      <AnimatePresence initial={false}>
        {[...items].reverse().map(({ id, attrs: { noiseStrength, growthSpeed, maxSize, rmsprop } }, i) => (
          <motion.g
            key={id}
            initial={{ y: -32 }}
            animate={{ y: i * 32 }}
            exit={{ y: i * 32 + 32 }}
            transition={{ type: 'spring', mass: 1, stiffness: 200, damping: 25 }}
            className={classNames(selected, id)}
            onMouseEnter={() => setSelected(id)}>
            <rect x="0" width="100%" height="32px" />
            <text x="8" y="21">
              <tspan>{noiseStrength} </tspan>
              <tspan>{growthSpeed} </tspan>
              <tspan>{maxSize} </tspan>
              <tspan>{rmsprop.toString()} </tspan>
              <tspan>{id}</tspan>
            </text>
          </motion.g>
        ))}
      </AnimatePresence>
    </List>
  )
}

const List = styled.svg`
  g {
    rect {
      fill: #00000000;
    }
    &.odd {
      rect {
        fill: white;
      }
      &.selected {
        color: #ffcb00;
        fill: #ffcb0011;
      }
    }
    &.selected {
      rect {
        fill: #ffcb00;
      }
      text {
        fill: white;
      }
    }
  }
`
