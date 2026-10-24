import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' : le site fonctionne sur GitHub/GitLab Pages, Vercel et Netlify sans réglage
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
