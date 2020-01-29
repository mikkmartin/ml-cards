import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import List from './List'
import LineChart from './LineChart'
import Inputs from './Inputs'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'

const attrs = {
  noiseStrength: 0.95,
  growthSpeed: 3,
  maxSize: 900,
  rmsprop: true
}

export default function App() {
  const [items, next, selected, setSelected] = useItems(6)
  const progress = useMotionValue(0)

  return (
    <Layout>
      <div>
        <small>INPUT: test.py</small>
        <Inputs items={attrs} onRun={next} />
        <List selected={selected} setSelected={setSelected} items={items} />
      </div>
      <div>
        <small>OUTPUT: run_001</small>
        <ImageSlider progress={progress} />
      </div>
      <div>
        <small>&nbsp;</small>
        <LineChart progress={progress} selected={selected} />
        <Notes />
      </div>
    </Layout>
  )
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
  align-items: start;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const useItems = initialAmount => {
  const [count, setCount] = useState(initialAmount)
  const [selected, setSelected] = useState(initialAmount - 1)
  const defaultObject = {
    attrs,
    data: {
      detailed: {},
      smooth: {}
    }
  }
  const [items, setItems] = useState(
    [...Array(initialAmount)].map((_, id) => ({
      ...defaultObject,
      id
    }))
  )
  return [
    items,
    (item = {}) => {
      setItems(oldItems => {
        setCount(count + 1)
        setSelected(count)
        const newItems = [...oldItems]
        newItems.shift()
        newItems.push({
          id: count,
          attrs: { ...defaultObject.attrs, ...item },
          ...defaultObject,
          ...item
        })
        return newItems
      })
    },
    selected,
    nr => setSelected(nr)
  ]
}
