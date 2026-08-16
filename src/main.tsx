import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { applyRuntimeSeo } from './lib/seo'
import './styles/index.css'
import './styles/gallery-carousel.css'
import './styles/polish.css'

applyRuntimeSeo()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
