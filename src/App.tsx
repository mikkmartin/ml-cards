import React, { useState } from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import LineChart from './LineChart'
import Inputs from './Inputs'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'

export default function App() {
  const progress = useMotionValue(0)
  const [selected, setSelected] = useState(0)

  return (
    <Layout>
      <Inputs selected={selected} setSelected={setSelected} />
      <LineChart progress={progress} selected={selected} />
      <ImageSlider progress={progress} />
      <Notes />
    </Layout>
  )
}

const Layout = styled.div`
  > div {
    margin-bottom: 0.5rem;
  }
`
