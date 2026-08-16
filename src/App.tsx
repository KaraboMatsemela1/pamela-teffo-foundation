import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}
