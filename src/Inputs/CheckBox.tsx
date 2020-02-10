import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function({ x, y, onChange }) {
  const [checked, setChecked] = useState(true)
  return (
    <CheckboxContainer>
      <foreignObject x={x} y={y} width="32" height="32">
        <label>
          <HiddenCheckbox
            checked={checked}
            onChange={() => {
              onChange(!checked)
              setChecked(!checked)
            }}
          />
          <StyledCheckbox checked={checked}>
            <Icon viewBox="-2 -2 27 27">
              <polyline points="20 6 9 17 4 12" />
              <rect x="-2" y="-2" width="100%" height="100%" />
            </Icon>
          </StyledCheckbox>
        </label>
      </foreignObject>
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.g``

const Icon = styled.svg`
  fill: none;
  stroke: #ffcb00;
  stroke-width: 2px;
  rect {
    stroke: transparent;
  }
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  &:focus ~ div svg rect {
    stroke: #ffcb00;
  }
  &:active ~ div svg rect {
    fill: #ffcb0016;
  }
`

const StyledCheckbox = styled(motion.div)<any>`
  width: 32px;
  height: 32px;
  //transition: all 150ms;
  background: white;
  &:hover svg rect {
    stroke: #ffcb00;
  }

  ${Icon} polyline {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`
