import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from './Container'

export default function() {
  const { label, value } = useContext(Context)
  return (
    <Group>
      <text className="label" fontSize="10" fontWeight="400" letterSpacing="0.682" opacity="0.5" textAnchor="end">
        <tspan x="95.5%" y="105">
          {label}
        </tspan>
      </text>
      <text fontSize="30" letterSpacing="-1.36" textAnchor="end">
        <tspan x="96%" y="134">
          {value}
        </tspan>
      </text>
    </Group>
  )
}

const Group = styled.g`
  fill: white;
  font-family: SF Mono, monospace;
  text {
    font-weight: 200;
  }
  text.label {
    font-weight: 600;
    text-transform: uppercase;
  }
`
