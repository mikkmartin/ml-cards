import React, { createContext, useRef } from 'react'
import styled from 'styled-components'
import Label from './Label'
import Axis from './Axis'
import data from './data'

export const Context = createContext(null)
export default function({ label = 'Accuracy', value = 0.826 }) {
  const ref = useRef(null)
  return (
    <Context.Provider value={{ label, value, ref, data }}>
      <Container>
        <svg ref={ref} width="100%" height="100%">
          <Label />
          <Axis />
        </svg>
      </Container>
    </Context.Provider>
  )
}

const Container = styled.div`
  width: 375px;
  height: auto;
  background: #3e3e3e;
  color: white;
`
