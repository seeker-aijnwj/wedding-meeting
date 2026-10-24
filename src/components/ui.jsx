import { useEffect, useRef, useState } from 'react'

export function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 })
    ref.current && io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function Reveal({ children, className = '', delay = 0 }) {
  const [ref, seen] = useInView()
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</div>
}

export function Words({ text, as: T = 'h2', className = '' }) {
  const [ref, seen] = useInView()
  return (
    <T ref={ref} className={`${className} ${seen ? 'in' : ''}`}>
      {text.split(' ').map((w, i) => [<span key={i} className="word" style={{ '--i': i }}>{w}</span>, ' '])}
    </T>
  )
}

export function Countdown({ date }) {
  const calc = () => {
    const s = Math.floor(Math.max(0, new Date(date) - Date.now()) / 1000)
    return [['Jours', Math.floor(s / 86400)], ['Heures', Math.floor(s / 3600) % 24], ['Minutes', Math.floor(s / 60) % 60], ['Secondes', s % 60]]
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i) }, [date])
  return (
    <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
      {t.map(([l, v]) => (
        <div key={l} className="bg-white/10 backdrop-blur rounded-xl py-3 border border-white/20">
          <div className="font-serif text-3xl text-white tabular-nums">{String(v).padStart(2, '0')}</div>
          <div className="text-[.6rem] uppercase tracking-widest text-ciel">{l}</div>
        </div>
      ))}
    </div>
  )
}

export function Envelope({ p1, p2, onReveal }) {
  const [step, setStep] = useState(0) // 0 fermée, 1 rabat, 2 carte, 3 fondu
  const open = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(3); onReveal(); return }
    setStep(1)
    setTimeout(() => setStep(2), 1000)
    setTimeout(() => { setStep(3); onReveal() }, 2600)
  }
  return (
    <div className={`fixed inset-0 z-50 bg-nuit flex flex-col items-center justify-center gap-10 transition-opacity duration-[1600ms] ${step === 3 ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className="kente absolute top-0 inset-x-0" />
      <div className="kente absolute bottom-0 inset-x-0" />
      <div className="relative w-[300px] h-[200px]" style={{ perspective: 900, marginTop: step >= 2 ? 90 : 0, transform: step === 3 ? 'scale(1.25)' : 'none', transition: 'margin .9s ease, transform 1.6s ease' }}>
        <div className="absolute inset-0 rounded-md bg-[#e98f6c] shadow-2xl" />
        <div className="absolute inset-x-3 top-3 h-[170px] rounded bg-creme shadow flex flex-col items-center justify-center text-center transition-transform duration-[1400ms] ease-out" style={{ transform: step >= 2 ? 'translateY(-115px)' : 'none' }}>
          <p className="text-[.6rem] tracking-[.3em] uppercase text-orange">Vous êtes invités</p>
          <p className="font-script text-4xl text-nuit leading-tight">{p1} & {p2}</p>
          <div className="kente w-24 mt-2 !h-1.5" />
        </div>
        <div className="absolute inset-0 z-20 rounded-md bg-saumon" style={{ clipPath: 'polygon(0 0,50% 52%,100% 0,100% 100%,0 100%)' }} />
        <div className="absolute top-0 left-0 w-full h-[54%] bg-[#f7b79d] origin-top" style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)', transform: step >= 1 ? 'rotateX(180deg)' : 'none', zIndex: step >= 1 ? 5 : 30, transition: 'transform 1s ease, z-index 0s .5s' }} />
        <div className={`absolute left-1/2 top-[48%] z-40 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full grid place-items-center font-script text-2xl text-white transition-all duration-700 ${step >= 1 ? 'opacity-0 scale-75' : ''}`} style={{ background: 'radial-gradient(circle at 35% 30%,#f08a45,#b8431a 70%)', boxShadow: 'inset 0 0 0 3px rgba(0,0,0,.12),0 4px 10px rgba(0,0,0,.35)' }}>{p1[0]}{p2[0]}</div>
      </div>
      <button onClick={open} disabled={step > 0} className={`btn bg-orange text-white ${step > 0 ? 'opacity-0 pointer-events-none' : ''}`} style={{ transition: 'opacity .6s' }}>Ouvrir notre invitation</button>
    </div>
  )
}

export const Photo = ({ src, alt = '', className = '' }) => (
  <img src={src} alt={alt} loading="lazy" className={`w-full h-full object-cover ${className}`} />
)

export const Titre = ({ petit, text, light }) => (
  <div className="text-center mb-8">
    <p className="text-[.7rem] tracking-[.35em] uppercase text-orange mb-2">{petit}</p>
    <Words text={text} className={`font-serif text-4xl ${light ? 'text-white' : 'text-nuit'}`} />
  </div>
)
