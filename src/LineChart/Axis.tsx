import { useEffect, useContext } from 'react'
import { Context } from './Container'
import * as d3 from 'd3'

export default function() {
  const { ref, data } = useContext(Context)
  useEffect(() => {
    const svg = d3.select(ref.current)
    console.log(svg, data)
    /*
    const customXAxis = axisBottom(_x)
      //.tickValues([0, (d_detailed.length+1) * .5, d_detailed.length+1])
      .tickSize(-3)
      .tickFormat(d => (d >= 1000 ? Math.round(d / 100) / 10 + 'k' : Math.round(d)))
      */
  }, [data, ref])
  return null
}
