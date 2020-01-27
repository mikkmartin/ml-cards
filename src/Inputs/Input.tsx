import React from 'react'
import styled from 'styled-components'
import Boolean from './Boolean'
import Slider from '../common/Slider'

export default function({ name, type, onChange = _ => {} }) {
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

  function formatChange(val) {
    const obj = {}
    obj[name] = val
    onChange(obj)
  }

  function inputType(type) {
    switch (type) {
      case 'float':
        return <Slider min={0} max={1} value={0.95} step={0.01} onChange={formatChange} />
      case 'int':
        return <Slider min={1} max={5} value={3} step={1} onChange={formatChange} />
      case 'bool':
        return <Boolean onChange={formatChange} />
      default:
        return <div>✓</div>
    }
  }

  return (
    <Container>
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
