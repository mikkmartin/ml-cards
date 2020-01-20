import React, { useState } from 'react'
import styled from 'styled-components'
import Boolean from './Boolean'
import Slider from '../common/Slider'

export default function({ name, type, onChange = () => {} }) {
  const [checked, setChecked] = useState(true)

  function typeString(type) {
    switch (type) {
      case 'float':
        return <span>(float)</span>
      case 'int':
        return <span>(int)</span>
      case 'bool':
        return <span>(bool)</span>
      default:
        return null
    }
  }

  function inputType(type) {
    switch (type) {
      case 'float':
        return <Slider min={0} max={1} value={0.95} />
      case 'int':
        return <Slider min={0} max={5} value={3} />
      case 'bool':
        return <Boolean checked={checked} onChange={() => setChecked(!checked)} />
      default:
        return <div>✓</div>
    }
  }

  return (
    <Container onClick={() => onChange()}>
      <div>
        {name}
        <span> {typeString(type)}</span>
      </div>
      <div>{inputType(type)}</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    width: 50%;
    > span {
      > span {
        opacity: 0.5;
      }
    }
  }
`
