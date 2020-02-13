import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { button as transition } from '../common/animations'
import Slider from './Slider'
import CheckBox from './CheckBox'

export default function({ onRun, initialItems }) {
  const items = useMemo(() => initialItems, [])
  const [state, setState] = useState(initialItems)
  const height = Object.keys(items).length * 32 + 72

  function onChange(newObject) {
    setState(oldObject => {
      //console.log(oldObject, newObject)
      return { ...oldObject, ...newObject }
    })
  }

  function getType(val) {
    switch (true) {
      case Number.isInteger(val):
        return 'int'
      case typeof val === 'number':
        return 'float'
      case typeof val === 'boolean':
        return 'bool'
      default:
        return false
    }
  }

  function Input({ type, name, ...rest }) {
    const max = name === 'maxSize' ? 1000 : 5
    switch (type) {
      case 'float':
        return <Slider min={0.01} max={1} step={0.01} {...rest} />
      case 'int':
        return <Slider min={1} max={max} {...rest} />
      case 'bool':
        return <CheckBox {...rest} />
    }
  }

  return (
    <Container width="375" height="187" viewBox={`0 0 375 187`}>
      {useMemo(
        () =>
          Object.keys(items).map((name, i) => {
            const type = getType(items[name])
            const y = i * 32 + 20
            return (
              <g key={i}>
                <text y={y}>
                  {name} <tspan>({type})</tspan>
                </text>
                <Input
                  name={name}
                  height="30"
                  type={type}
                  value={items[name]}
                  y={i * 32}
                  onChange={val => onChange({ [name]: val })}
                  x="225"
                  width="150"
                />
              </g>
            )
          }),
        [initialItems]
      )}
      <motion.g className="button" onTap={() => onRun(state)} transition={transition} style={{ y: height - 64 }}>
        <rect x="0" y="0" width="100%" height="48" />
        <text x="50%" y="28" textAnchor="middle">
          New run
        </text>
      </motion.g>
    </Container>
  )
}

const Container = styled.svg`
  width: 100%;
  height: auto;
  text {
    tspan {
      opacity: 0.5;
    }
  }
  .button {
    text {
      user-select: none;
    }
    rect {
      fill: #ffcb00;
    }
    &:hover {
      rect {
        fill: #fcb800;
      }
    }
    &:active {
      rect {
        fill: #dda139;
      }
    }
  }
`
