import React from 'react'
import { motion } from 'framer-motion'
import Input from './Input'
import styled from 'styled-components'

export default function({ selected, setSelected }) {
  return (
    <Container>
      <Input name="noiseStrench" type="float" />
      <Input name="grothSpeed" type="int" />
      <Input name="maxSize" type="int" />
      <Input name="rmsprop" type="bool" />
      <button>Rerun</button>
      <List>
        {[...Array(7)].map((d, i) => (
          <li className={selected === i ? 'selected' : ''} onMouseEnter={() => setSelected(i)}>
            <span>0.95</span>
            <span>900</span>
            <span>checkFur</span>
            <span>true</span>
            <span>remove</span>
          </li>
        ))}
      </List>
    </Container>
  )
}

const Container = styled.div`
  button {
    background: #ffcb00;
    border: none;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }
`

const List = styled.div`
  padding-left: 0;
  > li {
    list-style-type: none;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    &:nth-child(odd) {
      background: white;
    }
    &.selected {
      color: #ffcb00;
      background: #ffcb0011;
    }
  }
`
