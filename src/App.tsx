import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import List from './List'
import LineChart from './LineChart'
import Inputs from './Inputs'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'

export default function App() {
  const [items, next, selected, setSelected] = useItems(6)
  const progress = useMotionValue(0)

  return (
    <Layout>
      <Inputs onRun={next} />
      <List selected={selected} setSelected={setSelected} items={items} />
      <LineChart progress={progress} selected={selected} />
      <ImageSlider progress={progress} />
      {/*
      <Notes />
      */}
    </Layout>
  )
}

const Layout = styled.div`
  > div {
    margin-bottom: 0.5rem;
  }
`

const useItems = initialAmount => {
  const [count, setCount] = useState(initialAmount)
  const [selected, setSelected] = useState(initialAmount - 1)
  const defaultObject = {
    attrs: {
      noiseStrength: 0.95,
      growthSpeed: 5,
      maxSize: 5,
      rmsprop: true
    },
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
    (item = defaultObject) => {
      setItems(oldItems => {
        setCount(count + 1)
        setSelected(count)
        const newItems = [...oldItems]
        newItems.shift()
        newItems.push({ ...item, id: count })
        return newItems
      })
    },
    selected,
    nr => setSelected(nr)
  ]
}
