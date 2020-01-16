import React, { createContext, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import Label from './Label'
import Axis from './Axis'
import Line from './Line'
import generateData from './data'

const datasets = [...Array(7)].map(i => generateData(122 * 4))
export const Context = createContext(null)
export default function({ label = 'Accuracy', progress = useMotionValue(0), selected }) {
  const ref = useRef(null)

  return (
    <Context.Provider value={{ label, ref, data: generateData(122 * 2), progress }}>
      <Container>
        <svg ref={ref} width="100%" height="100%">
          {datasets.map((dataset, i) => (
            <Line key={i} selected={i === selected} data={dataset} />
          ))}
          <Label />
          <Axis />
        </svg>
      </Container>
    </Context.Provider>
  )
}

const Container = styled.div`
  width: 375px;
  height: 165px;
  background: #3e3e3e;
  color: white;
  g {
    path {
      fill: none;
      stroke-width: 2;
      &.smooth {
        stroke: white;
        opacity: 0.1;
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
