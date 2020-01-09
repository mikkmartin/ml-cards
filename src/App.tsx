import React from 'react'
import ImageSlider from './ImageSlider'
import LineChart from './LineChart'
import { useMotionValue } from 'framer-motion'

export default function App() {
  const progress = useMotionValue(0)
  return (
    <div>
      <LineChart />
      <ImageSlider progress={progress} />
    </div>
  )
}
