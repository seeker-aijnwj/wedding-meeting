import { config as c } from '../config.js'
import { Reveal, Titre } from './ui.jsx'

// Grille de phases côte à côte : 2 colonnes (téléphone), 4 sur grand écran (≥1024px)
export default function Programme() {
  return (
    <section id="programme" className="px-4 py-20 max-w-5xl mx-auto">
      <Titre petit="Le grand jour" text="Le programme" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
        {c.programme.map((p, i) => {
          const l = c.lieux.find((x) => x.id === p.lieu)
          return (
            <Reveal key={p.titre} delay={(i % 2) * 150} className="h-full">
              <article className="h-full flex flex-col items-center text-center bg-white rounded-3xl p-4 sm:p-6 shadow-[0_12px_40px_-18px_rgba(15,29,68,.35)] border border-nuit/5">
                <span className="text-[.58rem] tracking-[.3em] text-nuit/40">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 rounded-full bg-gradient-to-br from-orange to-[#f2955a] text-white font-serif text-xl px-4 py-1.5 leading-none">{p.heure}</p>
                <h3 className="font-serif text-xl sm:text-2xl leading-tight mt-4">{p.titre}</h3>
                <p className="text-xs sm:text-sm opacity-75 mt-2">{p.texte}</p>
                {l && <p className="mt-auto pt-4 text-[.6rem] uppercase tracking-[.2em] text-ciel">{l.nom}</p>}
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
