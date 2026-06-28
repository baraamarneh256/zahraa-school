import { useState, useEffect } from 'react'

export function useCountUp(target, active, duration = 1500) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let current = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return val
}
