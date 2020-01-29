import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { button as transition } from '../common/animations'
import Slider from './Slider'
import CheckBox from './CheckBox'

export default function({ onRun, items }) {
  const [currentValues, changeCurrentValues] = useState({})
  const height = Object.keys(items).length * 32 + 72

  function onChange(newObject) {
    //changeCurrentValues(oldObject => ({ ...oldObject, ...newObject }))
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
        return <Slider max={1} step={0.01} {...rest} />
      case 'int':
        return <Slider max={max} {...rest} />
      case 'bool':
        return <CheckBox {...rest} />
    }
  }

  return (
    <Container width="375" height={height} viewBox={`0 0 375 ${height}`}>
      {Object.keys(items).map((name, i) => {
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
              onChange={onChange}
              x="225"
              width="150"
            />
          </g>
        )
      })}
      <motion.g
        className="button"
        onTap={() => onRun(currentValues)}
        transition={transition}
        style={{ y: height - 48 }}>
        <rect x="0" y="0" width="100%" height="48" />
        <text x="50%" y="28" textAnchor="middle">
          Rerun
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
