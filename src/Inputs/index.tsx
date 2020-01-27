import React, { useState } from 'react'
import Input from './Input'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function({ onRun }) {
  const [currentValues, changeCurrentValues] = useState({})
  function onChange(newObject) {
    changeCurrentValues(oldObject => ({ ...oldObject, ...newObject }))
  }
  return (
    <Container>
      <Input name="noiseStrench" type="float" onChange={onChange} />
      <Input name="grothSpeed" type="int" onChange={onChange} />
      <Input name="maxSize" type="int" onChange={onChange} />
      <Input name="rmsprop" type="bool" onChange={onChange} />
      <motion.button onTap={() => onRun(currentValues)}>Rerun</motion.button>
    </Container>
  )
}

const Container = styled.div`
  width: 375px;
  button {
    background: #ffcb00;
    border: none;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }
`
