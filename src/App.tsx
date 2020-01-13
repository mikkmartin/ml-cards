import React from 'react'
import ImageSlider from './ImageSlider'
import Notes from './Notes'
import LineChart from './LineChart'
import { useMotionValue } from 'framer-motion'
import styled from 'styled-components'

export default function App() {
  const progress = useMotionValue(0)
  return (
    <Layout>
      <LineChart />
      <Notes />
      <ImageSlider progress={progress} />
    </Layout>
  )
}

const Layout = styled.div`
  > div {
    margin-bottom: 0.5rem;
  }
`
