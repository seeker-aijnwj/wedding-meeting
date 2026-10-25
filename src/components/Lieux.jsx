import { config as c } from '../config.js'
import { Photo, Reveal, Titre } from './ui.jsx'

const mapSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
const route = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`

// Grille de lieux : 1 colonne sur petit écran, 2 côte à côte dès 640px (sm)
export default function Lieux() {
  const lieux = c.lieux.filter((l) => c.programme.some((p) => p.lieu === l.id))
  return (
    <section id="lieux" className="bg-nuit text-white px-5 py-20">
      <div className="max-w-4xl mx-auto">
        <Titre petit="Où nous retrouver" text={lieux.length > 1 ? 'Les lieux' : 'Le lieu'} light />
        <div className="grid gap-6 sm:grid-cols-2 items-stretch">
          {lieux.map((l, i) => (
            <Reveal key={l.id} delay={(i % 2) * 200} className="h-full">
              <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/15">
                <div className="p-5 text-center">
                  <h3 className="font-serif text-2xl">{l.nom}</h3>
                  <p className="text-sm text-white/80 mt-1">{l.adresse}</p>
                  <ul className="mt-3 space-y-1 text-xs text-saumon">
                    {c.programme.filter((p) => p.lieu === l.id).map((p) => (
                      <li key={p.titre}><b className="font-medium">{p.heure}</b> · {p.titre}</li>
                    ))}
                  </ul>
                </div>
                <iframe title={`Carte ${l.nom}`} src={mapSrc(l.requete)} loading="lazy" className="w-full h-48 border-0" referrerPolicy="no-referrer-when-downgrade" />
                <div className="p-5 mt-auto text-center">
                  <a href={route(l.requete)} target="_blank" rel="noreferrer" className="btn bg-orange text-white">Ouvrir l'itinéraire</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
