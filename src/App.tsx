import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import List from './List'
import LineChart from './LineChart'
import Inputs from './Inputs'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'
import Slider from './common/Slider'

export default function App() {
  const [items, next, selected, setSelected] = useItems(6)
  const progress = useMotionValue(0)

  return (
    <Layout width="375" height="375" viewBox="0 0 375 375">
      <Slider y="0" />
      <Slider y="36" min={0} max={1} step={0.1} x="175" width={200} />
      <Slider y="72" min={0} max={1} step={0.01} />
      <Slider y="108" min={0} max={1} step={0.01} />
      {/*
      <Inputs onRun={next} />
      <List selected={selected} setSelected={setSelected} items={items} />
      <LineChart progress={progress} selected={selected} />
      <ImageSlider progress={progress} />
      <Notes />
      */}
    </Layout>
  )
}

const Layout = styled.svg`
  width: 100%;
  height: 100%;
  background: #f2f2f4;
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
