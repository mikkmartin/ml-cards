import React, { createContext, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import Label from './Label'
import Axis from './Axis'
import Line from './Line'

export const Context = createContext(null)
export default function({ label = 'Accuracy', progress = useMotionValue(0), selected, items }) {
  const ref = useRef(null)
  const nth = selected % items.length

  return (
    <Context.Provider value={{ label, ref, data: items[nth].data, progress }}>
      <Svg ref={ref} width="100%" height="100%" viewBox="0 0 375 165">
        {items
          .map(item => item.data)
          .map((dataset, i) => (
            <Line key={i} selected={i === nth} data={dataset} />
          ))}
        <Label />
        <Axis />
      </Svg>
    </Context.Provider>
  )
}

const Svg = styled.svg`
  background: white;
  margin-bottom: 0.15rem;
  g {
    path {
      fill: none;
      stroke-width: 2;
      &.smooth {
        stroke: black;
        opacity: 0.05;
      }
      &.detailed {
        opacity: 0;
      }
    }
    &.selected path {
      stroke: #ffcb00;
      opacity: 1;
      &.detailed {
        opacity: 0.35;
      }
    }
  }
`
