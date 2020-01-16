import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  background: white;
`

const Icon = styled.svg`
  fill: none;
  stroke: #ffcb00;
  stroke-width: 2px;
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
`

const StyledCheckbox = styled(motion.div)`
  width: 32px;
  height: 32px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

export default function({ className, checked, ...props }) {
  return (
    <CheckboxContainer className={className}>
      <label>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
          <Icon viewBox="-2 -2 27 27">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </label>
    </CheckboxContainer>
  )
}
