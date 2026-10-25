import { config as c } from '../config.js'
import { wishlist, wishlistIntro } from '../wishlist.js'
import { Photo, Reveal, Titre } from './ui.jsx'
import Pied from '../Pied.jsx'

// Grille adaptative : 2 éléments par ligne (téléphone), 3 (tablette ≥640px), 4 (ordinateur ≥1024px)
export default function Cadeaux() {
  return (
    <main className="min-h-svh">
      <div className="kente" />
      <div className="px-4 py-14 max-w-5xl mx-auto">
        <a href="#/" className="text-sm underline underline-offset-4">← Retour à l'invitation</a>
        <div className="mt-8"><Titre petit={`${c.prenom1} & ${c.prenom2}`} text="Notre liste de cadeaux" /></div>
        <Reveal><p className="text-center font-serif italic text-lg max-w-xl mx-auto mb-10">{wishlistIntro}</p></Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {wishlist.map((w, i) => (
            <Reveal key={w.nom} delay={(i % 4) * 120} className="h-full">
              <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-nuit/10">
                <div className="aspect-square"><Photo src={w.photo} alt={w.nom} /></div>
                <div className="p-3 text-center">
                  <h3 className="font-serif text-lg leading-tight">{w.nom}</h3>
                  {w.note && <p className="text-xs opacity-70 mt-1">{w.note}</p>}
                  {w.detail && <p className="text-xs font-medium text-orange mt-2">{w.detail}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <Pied />
    </main>
  )
}
