import SimplexNoise from 'simplex-noise'
import * as d3 from 'd3'
import { transform } from 'framer-motion'

function rnd(min, max) {
  return Math.random() * (max - min) + min
}

export default function(amount, attrs) {
  const simplex = new SimplexNoise(),
    detailed = [],
    smooth = [],
    peak = rnd(0.1, 1),
    speed = rnd(1, 20),
    balance = rnd(0.1, 1)

  const easeInOutQuint = t => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t)

  for (let x = 0; x < amount; x++) {
    const exp = Math.exp((-x / amount) * speed) * (2 * peak) - peak
    const ease = 1 - easeInOutQuint(x / amount) * (2 * peak) - peak
    const curve = (1 - balance) * ease + balance * exp

    const outline = simplex.noise2D(x / 30, 0) * Math.exp((-x / amount) * 2)
    const detail = simplex.noise2D(x / 5, 0) * Math.exp((-x / amount) * 2)
    detailed.push(curve + (outline * 0.1 + detail) / 2)
    smooth.push(curve + (outline * 0.01 + detail * 0) / 2)
    //smooth.push(ease)
  }

  const min = d3.min(detailed)
  const max = d3.max(detailed)

  return {
    detailed: detailed.map(val => transform(val, [min, max], [0, 1])),
    smooth: smooth.map(val => transform(val, [min, max], [0, 1]))
  }
}
