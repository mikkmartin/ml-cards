import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

let count = 6
function next() {
  count = count + 1
  return count
}

export default function({ selected, setSelected }) {
  const [items, setItems] = useState([...Array(count + 1)].map((_, i) => i).reverse())

  function remove() {
    const newItems = [next(), ...items]
    newItems.pop()
    setItems(newItems)
    setSelected(items[0] + 1)
  }

  function classNames(selected, id) {
    return [selected === id ? 'selected' : '', id % 2 ? 'odd' : ''].join(' ')
  }

  return (
    <>
      <List width="100%" height={items.length * 32 + 'px'}>
        <AnimatePresence initial={false}>
          {items.map((id, i) => (
            <motion.g
              key={id}
              initial={{ y: -32 }}
              animate={{ y: i * 32 }}
              exit={{ y: i * 32 + 32 }}
              transition={{ type: 'spring', mass: 2, stiffness: 200, damping: 35 }}
              className={classNames(selected, id)}
              onMouseEnter={() => setSelected(id)}>
              <rect x="0" width="100%" height="32px" />
              <text x="8" y="21">
                <tspan>0.95</tspan>
                <tspan>900</tspan>
                <tspan>checkFur</tspan>
                <tspan>true</tspan>
                <tspan>remove</tspan>
                <tspan> {id}</tspan>
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
      </List>
      <button onClick={remove}>Add</button>
    </>
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
