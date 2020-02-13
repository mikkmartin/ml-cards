import { useEffect, useContext } from 'react'
import { Context } from './Container'
import * as d3 from 'd3'
import { transform } from 'framer-motion'

let svg, xAxis, xAxisLines
const w = 375
const h = 167

export default function() {
  const { ref, data, progress } = useContext(Context)
  const getIteration = val => Math.floor(transform(val, [0, 1], [0, data.detailed.length]))

  useEffect(() => {
    svg = d3.select(ref.current)
    xAxis = svg
      .append('g')
      .attr('class', 'lines')
      .attr('transform', `translate(0, ${h - 15})`)
    xAxisLines = svg.append('g').attr('transform', `translate(0, ${h - 15})`)
    updateProgress(0)
  }, [ref])

  function updateProgress(val) {
    const iteration = getIteration(val)
    const max = 50 < iteration ? iteration : 50

    const x = d3
      .scaleLinear()
      .domain([0, max])
      .range([14, w - 17])

    const customXAxis = d3
      .axisBottom(x)
      .tickValues([0, iteration * 0.5, iteration])
      .tickSize(-5)
      .ticks(3)
      .tickFormat(d => Math.floor(d.valueOf()).toString())

    const customLines = d3
      .axisBottom(x)
      .ticks(15)
      .tickSize(-3)
      .tickFormat(d => '')

    const styleAxis = g => {
      g.selectAll('.tick:last-child')
        .select('text')
        .attr('text-anchor', 'end')
        .attr('x', 2)
      g.selectAll('text').attr('y', 5)
    }

    xAxis.call(customXAxis).call(styleAxis)
    xAxisLines.call(customLines)
  }

  useEffect(() => {
    const unsubscribeProgress = progress.onChange(updateProgress)
    return () => unsubscribeProgress()
  }, [data, ref, progress])

  return null
}
