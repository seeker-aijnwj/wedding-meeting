## ✏️ Modifier le contenu
| Fichier | Contenu |
|---|---|
| `src/config.js` | Prénoms, date, phrase d'accueil, programme, lieux, tenue, lien du formulaire, date limite |
| `src/wishlist.js` | Liste de cadeaux (nom, photo, note) |
| `public/photos/` | Photos : remplacez-les en gardant le même nom, ou changez le chemin dans les fichiers ci-dessus |

Couleurs et polices : `src/index.css` (bloc `@theme`).
Lien direct vers la wishlist : `votre-lien/#/cadeaux`.

## 🧪 Tester sur votre ordinateur
```bash
npm install
npm run dev      # ouvre http://localhost:5173
npm run build    # génère le dossier dist/
```

## 🚀 Mise en ligne

Les 4 méthodes commencent par un dépôt. Vercel et Netlify installent et compilent tout seuls.
Réglages à retenir : **Build command** `npm run build` — **Output directory** `dist`.

### A. GitHub + Vercel
1. Créez un compte sur github.com puis cliquez **New repository** (nom : `invitation-mariage`, **Public**).
2. Cliquez **uploading an existing file**, glissez-y **le contenu** du dossier décompressé (pas le dossier `node_modules`), puis **Commit changes**.
3. Allez sur vercel.com → **Sign up with GitHub**.
4. **Add New… → Project** → choisissez `invitation-mariage` → **Import**.
5. Vercel détecte Vite automatiquement. Cliquez **Deploy**.
6. Après ~1 minute, vous obtenez un lien `https://invitation-mariage.vercel.app` à partager.

### B. GitHub + Netlify
1. Faites les étapes 1 et 2 ci-dessus.
2. Sur netlify.com → **Sign up with GitHub**.
3. **Add new site → Import an existing project → GitHub** → choisissez le dépôt.
4. Vérifiez : Build command `npm run build`, Publish directory `dist`. Cliquez **Deploy**.
5. Récupérez le lien `https://xxxx.netlify.app` (modifiable dans **Site configuration → Change site name**).

### C. GitLab + Vercel
1. Créez un compte sur gitlab.com → **New project → Create blank project** (nom `invitation-mariage`, visibilité **Public**).
2. Dans le projet : **+ → Upload file** et ajoutez les fichiers (ou utilisez git en ligne de commande), puis **Commit changes**.
3. Sur vercel.com → **Sign up with GitLab**.
4. **Add New… → Project** → importez le projet GitLab → **Deploy**.
5. Partagez le lien `https://….vercel.app`.

### D. GitLab + Netlify
1. Faites les étapes 1 et 2 de la méthode C.
2. Sur netlify.com → **Sign up with GitLab**.
3. **Add new site → Import an existing project → GitLab** → choisissez le projet.
4. Build command `npm run build`, Publish directory `dist` → **Deploy**.
5. Partagez le lien `https://xxxx.netlify.app`.

### 🔁 Mettre à jour plus tard
Modifiez un fichier sur GitHub/GitLab (icône crayon) puis **Commit** : Vercel/Netlify republient seuls en ~1 minute.

### 💡 GitHub Pages / GitLab Pages
Le site utilise `base: './'`, il fonctionne aussi sur Pages : lancez `npm run build` et publiez le contenu de `dist/`.

## 📝 Formulaire de réponse
Créez un Google Forms (nom, nombre de personnes, présence), copiez son lien dans `rsvp.url` de `src/config.js`.
