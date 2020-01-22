import React from 'react'
import Input from './Input'
import styled from 'styled-components'

export default function({ onRun }) {
  return (
    <Container>
      <Input name="noiseStrench" type="float" />
      <Input name="grothSpeed" type="int" />
      <Input name="maxSize" type="int" />
      <Input name="rmsprop" type="bool" />
      <button onClick={() => onRun()}>Rerun</button>
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
