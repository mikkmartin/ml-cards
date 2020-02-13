import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Context } from './Container'
import { transform } from 'framer-motion'

export default function() {
  const [currentValue, setCurrentValue] = useState(0.0)
  const { label, data, progress } = useContext(Context)
  const getIteration = val => Math.floor(transform(val, [0, 1], [0, data.detailed.length - 1]))

  useEffect(() => {
    const unsubscribeProgress = progress.onChange(val => {
      const iteration = getIteration(val)
      const formated = (Math.floor((1 - data.smooth[iteration]) * 1000) / 1000).toString().padEnd(5, '0')
      setCurrentValue(formated)
    })
    return () => {
      unsubscribeProgress()
    }
  })

  return (
    <Group>
      <text className="label" fontSize="10" fontWeight="400" letterSpacing="0.682" opacity="0.5" textAnchor="end">
        <tspan x="95.5%" y="105">
          {label}
        </tspan>
      </text>
      <text fontSize="30" letterSpacing="-1.36" textAnchor="end">
        <tspan x="96%" y="134">
          {currentValue.toFixed(2)}
        </tspan>
      </text>
    </Group>
  )
}

const Group = styled.g`
  fill: black;
  font-family: SF Mono, monospace;
  text {
    font-weight: 200;
  }
  text.label {
    font-weight: 600;
    text-transform: uppercase;
  }
`
