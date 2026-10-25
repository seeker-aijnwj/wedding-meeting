import { useEffect, useState } from 'react'
import { config as c } from './config.js'
import { BottomNav, Countdown, Envelope, Photo, Reveal, Titre, Words } from './components/ui.jsx'
import Lieux from './components/Lieux.jsx'
import Cadeaux from './components/Cadeaux.jsx'
import Programme from './components/Programme.jsx'
import Pied from './Pied.jsx'

const fmt = (d, o) => new Date(d).toLocaleDateString('fr-FR', o)
const dateLongue = fmt(c.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const carte = 'bg-white rounded-3xl shadow-[0_12px_40px_-18px_rgba(15,29,68,.35)] border border-nuit/5'

function Accueil() {
  return (
    <header id="accueil" className="relative min-h-svh overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 text-white">
      <div className="absolute inset-0"><Photo src="photos/hero.svg" alt="" /></div>
      <div className="absolute inset-0 bg-gradient-to-b from-nuit/80 via-nuit/45 to-nuit/90" />
      <span className="orb bg-orange w-60 h-60 -top-16 -right-20" />
      <span className="orb bg-ciel w-64 h-64 bottom-16 -left-24" style={{ animationDelay: '-6s' }} />
      <div className="relative">
        <p className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-[.65rem] tracking-[.35em] uppercase text-saumon mb-6">Nous nous marions</p>
        <Words as="h1" text={c.prenom1} className="font-script text-7xl leading-[.95]" />
        <div className="flex items-center justify-center gap-3 my-1 text-orange"><span className="h-px w-10 bg-orange/60" /><span className="font-serif italic text-3xl">&</span><span className="h-px w-10 bg-orange/60" /></div>
        <Words as="h1" text={c.prenom2} className="font-script text-7xl leading-[.95]" />
        <p className="font-serif italic text-xl mt-7 max-w-xs mx-auto text-white/90">{c.accueil}</p>
        <p className="mt-6 mb-7 text-xs tracking-[.3em] capitalize">{dateLongue}</p>
        <Countdown date={c.date} />
      </div>
      <span className="absolute bottom-24 text-white/60 text-xl animate-bounce" aria-hidden="true">↓</span>
    </header>
  )
}

function Rsvp() {
  return (
    <section id="rsvp" className="px-5 py-20">
      <Reveal className="relative max-w-md mx-auto overflow-hidden rounded-[2rem] bg-nuit text-white text-center px-7 pt-12 pb-10 shadow-2xl">
        <div className="kente absolute top-0 inset-x-0" />
        <p className="text-[.68rem] tracking-[.4em] uppercase text-saumon mb-3">R.S.V.P</p>
        <h2 className="font-serif text-4xl leading-tight">Confirmer ma présence</h2>
        <p className="font-serif italic text-lg mt-4 mb-7 text-white/85">Merci de nous répondre avant le <b className="not-italic text-orange">{fmt(c.rsvp.limite, { day: 'numeric', month: 'long', year: 'numeric' })}</b>.</p>
        <a href={c.rsvp.url} target="_blank" rel="noreferrer" className="btn bg-orange text-white">Répondre à l'invitation</a>
        <p className="mt-6"><a href="#/cadeaux" className="text-sm underline underline-offset-4 text-white/80">Voir notre liste de cadeaux →</a></p>
      </Reveal>
    </section>
  )
}

function Tenue() {
  return (
    <section className="px-5 py-20 text-center bg-gradient-to-b from-creme to-saumon/25">
      <div className="max-w-md mx-auto">
        <Titre petit="Dress code" text="La tenue" />
        <Reveal>
          <div className="h-72 w-52 rounded-t-full overflow-hidden mx-auto mb-8 shadow-xl ring-4 ring-white"><Photo src="photos/couple.svg" alt="" /></div>
          <p className="font-serif text-xl italic">{c.tenue.texte}</p>
          <div className="grid grid-cols-4 gap-3 mt-8">
            {c.tenue.couleurs.map((k) => (
              <div key={k.hex} className={`${carte} py-4 !rounded-2xl`}>
                <div className="w-10 h-10 rounded-full mx-auto shadow-inner" style={{ background: k.hex }} />
                <p className="text-[.58rem] mt-2 uppercase tracking-wider">{k.nom}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const [hash, setHash] = useState(location.hash)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const f = () => { setHash(location.hash); scrollTo(0, 0) }
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  document.title = `${c.prenom1} & ${c.prenom2} — Invitation de mariage`

  if (hash === '#/cadeaux') return <Cadeaux />
  return (
    <>
      <Envelope p1={c.prenom1} p2={c.prenom2} dateLabel={fmt(c.date, { day: 'numeric', month: 'long', year: 'numeric' })} onReveal={() => setRevealed(true)} />
      {revealed && <BottomNav />}
      <div className={`transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0 h-svh overflow-hidden'}`}>
        <Accueil /><div className="kente" />
        <Programme /><Lieux /><Tenue /><Rsvp /><Pied />
      </div>
    </>
  )
}
