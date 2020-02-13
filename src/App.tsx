import React, { useState, useRef, createRef, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import List from './List'
import LineChart from './LineChart'
import Inputs from './Inputs'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import generateData from './common/data'
import AddCard from './AddCard'

const attrs = {
  noiseStrength: 0.95,
  growthSpeed: 3,
  maxSize: 900,
  rmsprop: true
}

interface ControlObject {
  current: { play: Function }
}

export default function App(controls: ControlObject = createRef()) {
  const [items, next, selected, setSelected] = useItems(7)
  const progress = useMotionValue(0)
  const ref = useRef(null)

  useEffect(() => {
    controls.current = {
      play() {
        ref.current()
      }
    }
  }, [controls])

  const onRun = d => {
    next(d)
    ref.current()
  }

  return (
    <Layout>
      <div>
        <small>INPUT: test.py</small>
        <Inputs initialItems={attrs} onRun={onRun} />
        <List selected={selected} setSelected={setSelected} items={items} />
      </div>
      <div>
        <small>OUTPUT: run_001</small>
        <ImageSlider progress={progress} ref={ref} />
      </div>
      <div className="subgrid">
        <small>&nbsp;</small>
        <LineChart progress={progress} selected={selected} items={items} />
        <Notes />
        <AddCard />
      </div>
    </Layout>
  )
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5vw;
  align-items: start;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  > div > svg {
    display: block;
    margin-bottom: 0.5vw;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    .subgrid {
      grid-column: 1 / 3;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0.5vw;
      svg {
        height: auto;
        &:last-child {
          display: none;
        }
      }
      small {
        display: none;
      }
    }
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
