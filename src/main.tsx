import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { setupNavigationMotion } from './lib/navigation-motion'
import { applyRuntimeSeo } from './lib/seo'
import './styles/index.css'
import './styles/gallery-carousel.css'
import './styles/polish.css'
import './styles/profile-content.css'
import './styles/logo-preview.css'
import './styles/navigation-motion.css'

applyRuntimeSeo()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const cleanupNavigationMotion = setupNavigationMotion()

if (import.meta.hot) {
  import.meta.hot.dispose(cleanupNavigationMotion)
}
