import { config as c } from './config.js'
import { Reveal } from './components/ui.jsx'

export default function Pied() {
  return (
    <footer className="relative bg-nuit text-white text-center pt-14 pb-28 px-6">
      <div className="kente absolute inset-x-0 top-0" />
      <Reveal>
        <p className="font-serif italic text-2xl">Merci de faire partie de notre histoire</p>
        <p className="font-script text-6xl text-orange mt-4">{c.prenom1[0]} & {c.prenom2[0]}</p>
        <p className="text-xs tracking-[.3em] uppercase mt-3 text-ciel">{new Date(c.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </Reveal>
    </footer>
  )
}
