import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

export default function({ selected, setSelected, items }) {
  const height = items.length * 32 + 14
  function classNames(selected, id) {
    return [selected === id ? 'selected' : '', id % 2 ? 'odd' : ''].join(' ')
  }

  return (
    <List width="375" height={height} viewBox={`0 0 375 ${height}`}>
      <AnimatePresence initial={false}>
        {[...items].reverse().map(({ id, name, start, attrs: { noiseStrength, growthSpeed, maxSize, rmsprop } }, i) => (
          <motion.g
            key={id}
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: i * 32 + 8, opacity: 1 }}
            exit={{ y: i * 32 + 40, opacity: 0 }}
            transition={{ type: 'spring', mass: 1, stiffness: 200, damping: 25 }}
            className={classNames(selected, id)}
            onMouseEnter={() => setSelected(id)}>
            <rect x="0" width="100%" height="32px" />
            <text x="8" y="21">
              <tspan className="name">{name} </tspan>
              <tspan x="120">{noiseStrength} </tspan>
              <tspan x="187">{growthSpeed} </tspan>
              <tspan x="226">{maxSize} </tspan>
              <tspan x="330" textAnchor="end" className={rmsprop ? 'true' : 'false'}>
                {rmsprop.toString()}{' '}
              </tspan>
            </text>
            <Icon timeStamp={start} />
          </motion.g>
        ))}
      </AnimatePresence>
    </List>
  )
}

function Icon({ timeStamp }) {
  const isPassed = () => timeStamp + 10000 > new Date().getTime()
  const [didFinish, setFinished] = useState(isPassed())

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPassed() !== didFinish) setFinished(isPassed())
    }, 100)
    return () => clearInterval(interval)
  }, [])

  if (didFinish) {
    return (
      <g
        className="icon"
        transform={`translate(346 8)`}
        strokeWidth="1.6"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle stroke="#FF2300" cx="8" cy="8" r="8" />
        <path stroke="#FF2401" fill="#FF2300" d="M5.6 5.6h4.8v4.8H5.6z" />
      </g>
    )
  } else {
    return (
      <g
        className="icon"
        transform={`translate(346 8)`}
        stroke="#000"
        strokeWidth="1.6"
        fill="none"
        fillRule="evenodd"
        opacity=".2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="8" cy="8" r="8" />
        <path d="M10.4 5.6l-4.8 4.8M5.6 5.6l4.8 4.8" />
      </g>
    )
  }
}

const List = styled.svg`
  width: 100%;
  height: auto;
  background: white;
  g {
    &:not(.selected) {
      .false {
        fill: rgba(0, 0, 0, 0.35);
      }
    }
    text {
      font-size: 16px;
    }
    .name {
      font-weight: bold;
    }
    rect {
      fill: #3e3e3e10;
    }
    &.odd {
      rect {
        fill: #ffffff00;
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
      .icon {
        stroke: white;
        opacity: 1;
      }
    }
  }
`
