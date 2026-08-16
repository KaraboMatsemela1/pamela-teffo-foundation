import { site } from '../../data/site'
import { Container } from '../ui/Container'

export function IdentityStrip() {
  return (
    <section className="identity-strip" aria-label="Verified foundation information">
      <Container className="identity-strip__grid">
        <div>
          <span>Organisation</span>
          <strong>{site.name}</strong>
        </div>
        <div>
          <span>Registration no.</span>
          <strong>{site.registrationNumber}</strong>
        </div>
        <div>
          <span>Based in</span>
          <strong>Mondeor, Johannesburg</strong>
        </div>
      </Container>
    </section>
  )
}
