import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import DonationPortal from './DonationPortal'
import { installNavigationMotion } from './lib/navigation-motion'
import { applyRuntimeSeo } from './lib/seo'
import './styles/index.css'
import './styles/gallery-carousel.css'
import './styles/polish.css'
import './styles/profile-content.css'
import './styles/logo-preview.css'
import './styles/donation.css'
import './styles/responsive-polish.css'
import './styles/motion-system.css'

applyRuntimeSeo()
installNavigationMotion()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <DonationPortal />
  </React.StrictMode>,
)
