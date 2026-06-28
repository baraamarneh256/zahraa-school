import { useEffect, useRef } from 'react'

export default function Reveal({ children, delay = 0, from = 'up', style }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('reveal-visible'), delay)
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const dirClass = from === 'left' ? 'reveal reveal-left' : from === 'right' ? 'reveal reveal-right' : 'reveal'

  return (
    <div ref={ref} className={dirClass} style={style}>
      {children}
    </div>
  )
}
