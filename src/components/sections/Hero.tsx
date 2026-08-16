import { site } from '../../data/site'
import { Container } from '../ui/Container'

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <img
        className="hero__image"
        src="/media/hero-community.webp"
        alt="Learners and adults together in a classroom during a Pamela Teffo Foundation school visit"
        width="1400"
        height="1050"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <Container className="hero__content">
        <p className="hero__eyebrow">Pamela Teffo Foundation · Johannesburg, South Africa</p>
        <h1 id="hero-heading">{site.tagline}</h1>
        <p className="hero__copy">
          Community-centred support, grounded in dignity, practical action and being present with the people we serve.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work">
            See Our Work
          </a>
          <a className="button button--ghost" href="#get-involved">
            Get Involved
          </a>
        </div>
      </Container>
      <p className="hero__caption">Photographed during a foundation school visit.</p>
    </section>
  )
}
