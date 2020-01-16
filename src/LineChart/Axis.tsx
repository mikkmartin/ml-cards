import { useEffect, useContext } from 'react'
import { Context } from './Container'
import * as d3 from 'd3'
import { transform } from 'framer-motion'

export default function() {
  const { ref, data, progress } = useContext(Context)
  const getIteration = val => Math.floor(transform(val, [0, 1], [0, data.detailed.length]))

  function updateProgress(val) {
    const iteration = getIteration(val)
    //console.log(iteration)
  }

  useEffect(() => {
    const svg = d3.select(ref.current)
    const w = 375
    const h = 165

    let xAxis = svg
      .append('g')
      .attr('class', 'lines')
      .attr('transform', `translate(0, ${h - 15})`)

    const _x = d3
      .scaleLinear()
      .domain([0, 1])
      .range([10, w - 30])

    const customXAxis = d3
      .axisBottom(_x)
      .tickValues([0, 300])
      .tickSize(-3)
      .tickFormat(d => d + 'k')

    xAxis.call(customXAxis)

    const unsubscribeProgress = progress.onChange(updateProgress)
    return () => {
      unsubscribeProgress()
    }
  }, [data, ref, progress])

  return null
}
