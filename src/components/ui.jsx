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
    return [['Jours', Math.floor(s / 86400)], ['Heures', Math.floor(s / 3600) % 24], ['Min', Math.floor(s / 60) % 60], ['Sec', s % 60]]
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i) }, [date])
  return (
    <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
      {t.map(([l, v]) => (
        <div key={l} className="rounded-2xl py-3.5 bg-white/10 backdrop-blur-md border border-white/25 shadow-[0_8px_30px_-12px_rgba(0,0,0,.6)]">
          <div className="font-serif text-4xl leading-none text-white tabular-nums">{String(v).padStart(2, '0')}</div>
          <div className="mt-1.5 text-[.58rem] uppercase tracking-[.2em] text-saumon">{l}</div>
        </div>
      ))}
    </div>
  )
}

// Enveloppe : 1 rabat s'ouvre → 2 la lettre sort au-dessus → 3 elle passe DEVANT l'enveloppe → 4 fondu vers le site
export function Envelope({ p1, p2, dateLabel, onReveal }) {
  const [step, setStep] = useState(0)
  const open = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(4); onReveal(); return }
    setStep(1)
    setTimeout(() => setStep(2), 1000)
    setTimeout(() => setStep(3), 2500)
    setTimeout(() => { setStep(4); onReveal() }, 4200)
  }
  const card = step >= 3 ? 'translateY(-50px) scale(1.12)' : step === 2 ? 'translateY(-190px)' : 'none'
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-12 transition-opacity duration-[1600ms] ${step === 4 ? 'opacity-0 pointer-events-none' : ''}`} style={{ background: 'radial-gradient(circle at 50% 35%,#1b2f6b,#0f1d44 70%)' }}>
      <div className="kente absolute top-0 inset-x-0" />
      <div className="kente absolute bottom-0 inset-x-0" />
      <div className="relative w-[300px] h-[200px]" style={{ perspective: 900, transform: step >= 2 ? 'translateY(110px)' : 'none', transition: 'transform 1.2s ease' }}>
        <div className="absolute inset-0 rounded-lg bg-[#0f1d44] shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]" />
        <div className="absolute inset-x-3 top-3 h-[170px] rounded-md bg-creme flex flex-col items-center justify-center text-center shadow-[0_10px_30px_-8px_rgba(0,0,0,.45)]" style={{ transform: card, zIndex: step >= 3 ? 35 : 10, transition: 'transform 1.4s cubic-bezier(.3,.7,.2,1)' }}>
          <p className="text-[.58rem] tracking-[.3em] uppercase text-orange">Vous êtes invités</p>
          <p className="font-script text-4xl text-nuit leading-tight mt-1">{p1} & {p2}</p>
          <p className="text-[.6rem] tracking-[.25em] uppercase text-nuit/70 mt-1">{dateLabel}</p>
          <div className="kente w-24 mt-3 !h-1.5 rounded-full" />
        </div>
        <div className="absolute inset-0 z-20 rounded-lg bg-saumon" style={{ clipPath: 'polygon(0 0,50% 52%,100% 0,100% 100%,0 100%)' }} />
        <div className="absolute top-0 left-0 w-full h-[54%] bg-[#f7b79d] origin-top" style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)', transform: step >= 1 ? 'rotateX(180deg)' : 'none', zIndex: step >= 1 ? 5 : 30, transition: 'transform 1s ease, z-index 0s .5s' }} />
        <div className={`absolute left-1/2 top-[48%] z-40 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full grid place-items-center font-script text-2xl text-white transition-all duration-700 ${step >= 1 ? 'opacity-0 scale-75' : ''}`} style={{ background: 'radial-gradient(circle at 35% 30%,#4aa5de,#0f1d44 70%)', boxShadow: 'inset 0 0 0 3px rgba(0,0,0,.12),0 4px 10px rgba(0,0,0,.35)' }}>{p1[0]}{p2[0]}</div>
      </div>
      <button onClick={open} disabled={step > 0} className={`btn bg-orange text-white ${step > 0 ? 'opacity-0 pointer-events-none' : ''}`} style={{ transition: 'opacity .6s' }}>Ouvrir notre invitation</button>
    </div>
  )
}

export const Photo = ({ src, alt = '', className = '' }) => (
  <img src={src} alt={alt} loading="lazy" className={`w-full h-full object-cover ${className}`} />
)

export const Titre = ({ petit, text, light }) => (
  <div className="text-center mb-10">
    <p className="text-[.68rem] tracking-[.4em] uppercase text-orange mb-3">{petit}</p>
    <Words text={text} className={`font-serif text-[2.6rem] leading-none ${light ? 'text-white' : 'text-nuit'}`} />
    <div className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-orange to-ciel" />
  </div>
)

export function BottomNav() {
  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <nav className="fixed bottom-4 inset-x-4 z-40 mx-auto max-w-sm flex items-center justify-between rounded-full bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_10px_40px_-10px_rgba(15,29,68,.5)] p-1.5 text-[.6rem] uppercase tracking-wider text-nuit">
      {[['Accueil', 'accueil'], ['Programme', 'programme'], ['Lieux', 'lieux'] ].map(([l, id]) => (
        <button key={id} onClick={go(id)} className="px-2.5 py-2.5 rounded-full active:bg-nuit/10">{l}</button>
      ))}
      <a href="#rsvp" className="px-3 py-2.5 rounded-full bg-orange text-white">CONFIRMER</a>
      <a href="#/cadeaux" className="px-3 py-2.5 rounded-full bg-nuit text-white">Cadeaux</a>
    </nav>
  )
}
