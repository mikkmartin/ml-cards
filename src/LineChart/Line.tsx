import React, { useEffect, useContext, useRef } from 'react'
import { Context } from './Container'
import * as d3 from 'd3'
import { transform } from 'framer-motion'

export default function({ data, selected }) {
  const g = useRef(null)
  const { ref, progress } = useContext(Context)
  const width = 375
  const height = 165

  useEffect(() => {
    const getIteration = val => Math.floor(transform(val, [0, 1], [0, data.detailed.length - 1]))
    const limits = [d3.min(data.detailed), d3.max(data.detailed)]
    const margin = { left: 14, top: 15 }
    let group

    function setup() {
      group = d3.select(g.current)
      group
        .append('path')
        .attr('class', 'detailed')
        .attr('stroke-linejoin', 'round')
      group
        .append('path')
        .attr('class', 'smooth')
        .attr('stroke-linejoin', 'round')
    }

    function update(val) {
      const iteration = getIteration(val)

      const scaleX = (d, i) => transform(i, [0, iteration > 50 ? iteration : 50], [margin.left, width - margin.left])
      const scaleY = d => transform(d, [limits[0], limits[1]], [margin.top, height - margin.top])
      const line = d3
        .line()
        .x(scaleX)
        .y(scaleY)

      group
        .select('.detailed')
        .datum(data.detailed.slice(0, iteration + 1))
        .attr('d', line)
      group
        .select('.smooth')
        .datum(data.smooth.slice(0, iteration + 1))
        .attr('d', line)
    }
    setup()
    update(progress.get())
    const unsubscribeProgress = progress.onChange(update)
    return () => {
      unsubscribeProgress()
    }
  }, [data, ref, progress])

  return <g className={selected ? 'selected' : ''} ref={g} />
}
