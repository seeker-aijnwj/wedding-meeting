import { useEffect, useState } from 'react'
import { config as c } from './config.js'
import { Countdown, Envelope, Photo, Reveal, Titre, Words } from './ui.jsx'
import Lieux from './components/Lieux.jsx'
import Cadeaux from './components/Cadeaux.jsx'
import Pied from './Pied.jsx'

const fmt = (d, o) => new Date(d).toLocaleDateString('fr-FR', o)
const dateLongue = fmt(c.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const mapSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
const route = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`
const ini = `${c.prenom1[0]} & ${c.prenom2[0]}`


function Accueil() {
  return (
    <header className="relative min-h-svh flex flex-col items-center justify-center text-center px-6 py-16 text-white">
      <div className="absolute inset-0"><Photo src="photos/hero.svg" alt="" /></div>
      <div className="absolute inset-0 bg-nuit/55" />
      <div className="relative">
        <p className="text-[.7rem] tracking-[.4em] uppercase text-saumon mb-4">Nous nous marions</p>
        <Words as="h1" text={c.prenom1} className="font-script text-7xl leading-none" />
        <p className="font-serif italic text-3xl text-orange my-1">&</p>
        <Words as="h1" text={c.prenom2} className="font-script text-7xl leading-none" />
        <p className="font-serif italic text-xl mt-8 max-w-xs mx-auto text-white/90">{c.accueil}</p>
        <p className="mt-6 mb-6 uppercase tracking-[.25em] text-sm capitalize">{dateLongue}</p>
        <Countdown date={c.date} />
      </div>
    </header>
  )
}

function Programme() {
  return (
    <section className="px-6 py-20 max-w-md mx-auto">
      <Titre petit="Le grand jour" text="Le programme" />
      <ol className="relative border-l-2 border-orange/40 ml-3 space-y-10">
        {c.programme.map((p) => {
          const l = c.lieux.find((x) => x.id === p.lieu)
          return (
            <li key={p.titre} className="pl-7 relative">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-orange ring-4 ring-creme" />
              <Reveal>
                <p className="font-serif text-orange text-xl">{p.heure}</p>
                <h3 className="font-serif text-2xl">{p.titre}</h3>
                <p className="mt-1 text-sm opacity-80">{p.texte}</p>
                {l && <p className="mt-1 text-xs uppercase tracking-widest text-ciel">{l.nom}</p>}
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Tenue() {
  return (
    <section className="px-6 py-20 max-w-md mx-auto text-center">
      <Titre petit="Dress code" text="La tenue" />
      <Reveal>
        <div className="h-64 rounded-t-full overflow-hidden mx-auto w-48 mb-8"><Photo src="photos/couple.svg" alt="" /></div>
        <p className="font-serif text-xl italic">{c.tenue.texte}</p>
        <div className="flex justify-center gap-5 mt-8">
          {c.tenue.couleurs.map((k) => (
            <div key={k.hex}>
              <div className="w-12 h-12 rounded-full mx-auto shadow-md ring-2 ring-white" style={{ background: k.hex }} />
              <p className="text-[.65rem] mt-2 uppercase tracking-wider">{k.nom}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Rsvp() {
  return (
    <section className="px-6 py-20 text-center bg-saumon/30">
      <Titre petit="R.S.V.P" text="Confirmer ma présence" />
      <Reveal>
        <p className="font-serif text-xl italic mb-6">Merci de nous répondre avant le <b className="not-italic">{fmt(c.rsvp.limite, { day: 'numeric', month: 'long', year: 'numeric' })}</b>.</p>
        <a href={c.rsvp.url} target="_blank" rel="noreferrer" className="btn bg-nuit text-white">Répondre à l'invitation</a>
        <p className="mt-8"><a href="#/cadeaux" className="underline underline-offset-4 text-sm tracking-wide">Voir notre liste de cadeaux →</a></p>
      </Reveal>
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
      {<Envelope p1={c.prenom1} p2={c.prenom2} onReveal={() => setRevealed(true)} />}
      <div className={`transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0 h-svh overflow-hidden'}`}>
        <Accueil /><div className="kente" />
        <Programme /><Lieux /><Tenue /><Rsvp /><Pied />
      </div>
    </>
  )
}
