import React, { useState, useContext, useEffect } from 'react'
import Slider from '../Inputs/Slider'
import { Context } from './index'
import { motion, transform } from 'framer-motion'

export default function() {
  const min = 0
  const max = 244
  const { pos, setTemporarylyPaused } = useContext(Context)
  const [value, setValue] = useState(0)

  function onChange(val) {
    const normalized = transform(val, [min, max], [0, 1])
    pos.set(normalized)
  }

  useEffect(() => {
    const unListen = pos.onChange(val => {
      const transformed = Math.round(transform(val, [0, 1], [min, max]))
      setValue(transformed)
    })
    return () => unListen()
  }, [pos])

  return (
    <Slider
      height={56}
      width={375}
      min={min}
      max={max}
      value={value}
      showLabel={false}
      onChange={onChange}
      onTapStart={() => setTemporarylyPaused(true)}
      onTap={() => setTemporarylyPaused(false)}
      onDragEnd={() => setTemporarylyPaused(false)}>
      <text x="16" y="32">
        <tspan>frame_{value}</tspan>
        <tspan x="359" textAnchor="end">
          {value}/{max}
        </tspan>
      </text>
    </Slider>
  )
}
