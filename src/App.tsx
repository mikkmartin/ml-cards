import React, { useState } from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import List from './List'
import LineChart from './LineChart'
import Inputs from './Inputs'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import generateData from './common/data'

const attrs = {
  noiseStrength: 0.95,
  growthSpeed: 3,
  maxSize: 900,
  rmsprop: true
}

export default function App() {
  const [items, next, selected, setSelected] = useItems(7)
  const progress = useMotionValue(0)

  return (
    <Layout>
      <div>
        <small>INPUT: test.py</small>
        <Inputs initialItems={attrs} onRun={next} />
        <List selected={selected} setSelected={setSelected} items={items} />
      </div>
      <div>
        <small>OUTPUT: run_001</small>
        <ImageSlider progress={progress} />
      </div>
      <div>
        <small>&nbsp;</small>
        <LineChart progress={progress} selected={selected} items={items} />
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
  const generateHash = () =>
    Math.round(Math.random() * 10000000000)
      .toString(36)
      .padEnd(7, '0')
  const startTime = isFirst => {
    const currentTime = new Date().getTime()
    const delay = isFirst ? 0 : -1000000000
    return currentTime + delay
  }
  const [count, setCount] = useState(initialAmount)
  const [selected, setSelected] = useState(initialAmount - 1)
  const defaultObject = () => ({
    attrs: {
      rmsprop: Math.random() > 0.5,
      noiseStrength: Math.floor(Math.random() * 100) / 100,
      growthSpeed: Math.floor(Math.random() * 10),
      maxSize: Math.floor(Math.random() * 1000)
    },
    data: generateData(122 * 5, attrs)
  })
  const [items, setItems] = useState(
    [...Array(initialAmount)].map((_, id) => ({
      ...defaultObject(),
      start: startTime(id === initialAmount - 1),
      name: generateHash(),
      id
    }))
  )
  return [
    items,
    attrs => {
      setItems(oldItems => {
        setCount(count + 1)
        setSelected(count)
        const newItems = [...oldItems]
        newItems.shift()
        newItems.push({
          name: generateHash(),
          start: new Date().getTime(),
          id: count,
          attrs,
          data: generateData(122 * 5, attrs)
        })
        return newItems
      })
    },
    selected,
    nr => setSelected(nr)
  ]
}
