import React, { useState, useEffect, useRef } from 'react'
import { motion, transform } from 'framer-motion'
import styled from 'styled-components'
import clamp from 'lodash/clamp'

export default function({
  min = 0,
  max = 100,
  step = 1,
  width = 375,
  height = 32,
  value: initialValue = round(max / 2, step),
  onChange = v => v,
  ...rest
}) {
  const transition = { type: 'spring', stiffness: 500, damping: 30, mass: 0.1 }
  const [value, setValue] = useState(initialValue)
  const [lastValue, setLastValue] = useState(initialValue)
  const [totalDragMovement, setTotalDragMovement] = useState(0)
  const [focus, setFocus] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const ref = useRef(null)
  const inputWidth = useRef(null)

  useEffect(() => {
    if (ref.current) {
      inputWidth.current = ref.current.getBoundingClientRect().width
    }
  }, [ref, inputWidth])

  function onTapStart(ev) {
    setTotalDragMovement(0)
    setStartPos(ev.clientX || ev.touches[0].clientX)
  }

  function onDrag(ev) {
    const mouseX = ev.clientX || ev.touches[0].clientX
    const movementX = mouseX - startPos
    setTotalDragMovement(movementX)
    const valueMoved = transform(movementX, [0, inputWidth.current], [min, max], { clamp: false })
    const clamped = clamp(lastValue + valueMoved, min, max)
    const rounded = round(clamped, step)
    setValue(rounded)
  }

  function onTap() {
    if (Math.abs(totalDragMovement) < 2) setFocus(true)
  }

  function onDragEnd() {
    setLastValue(value)
  }

  return (
    <Slider
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      drag="x"
      onTapStart={onTapStart}
      onDrag={onDrag}
      onTap={onTap}
      onDragEnd={onDragEnd}
      dragElastic={0}
      dragConstraints={{ left: 0, right: 0 }}
      ref={ref}
      {...rest}>
      <rect width="100%" height="100%" fill="white" />
      <Rect
        transition={transition}
        initial={false}
        animate={{ width: transform(value, [min, max], [0, width]) }}
        opacity=".1"
        height="100%"
      />
      <Rect
        transition={transition}
        initial={false}
        animate={{ x: transform(value, [min, max], [0, width - 1]) }}
        width="1"
        height="100%"
      />
      <foreignObject x="0" y="0" width="100%" height="100%">
        <InputText
          focus={focus}
          setFocus={setFocus}
          min={min}
          max={max}
          step={step}
          value={value}
          setValue={setValue}
        />
      </foreignObject>
    </Slider>
  )
}

const Rect = styled(motion.rect)`
  fill: #fdc900;
`
const Slider = styled(motion.svg)`
  text {
    fill: black;
    pointer-events: none;
  }
`

function InputText({ focus, setFocus, value, setValue, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    if (focus) ref.current.focus()
    ref.current.onblur = () => {
      setFocus(false)
    }
  }, [ref, focus, setFocus])

  return (
    <StyledInput
      type="number"
      ref={ref}
      value={value}
      {...rest}
      onChange={ev => {
        const val = parseFloat(ev.target.value) || 0
        setValue(val)
      }}
    />
  )
}

const StyledInput = styled.input`
  font-family: 'SFMono-Regular', 'SF Mono';
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  letter-spacing: 0.06;
  top: 0;
  left: 0;
  padding: 0 8px;
  background: none;
  border: none;
  -webkit-appearance: none;
  pointer-events: none;
  &:hover {
    cursor: col-resize;
  }
  &:focus {
    outline: none;
    cursor: text;
  }
  &::selection {
    background: #ffcb0044;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

function round(val, step) {
  const decimalPosition = step.toString().length > 1 ? step.toString().split('.')[1].length : 0
  const decimalMultiplier = [...Array(decimalPosition)].reduce(v => v * 10, 1)
  return Math.round((val + Number.EPSILON) * decimalMultiplier) / decimalMultiplier
}
