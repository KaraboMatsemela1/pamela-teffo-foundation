import { navigation, site } from '../../data/site'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid">
        <div className="site-footer__identity">
          <p className="site-footer__name">{site.name}</p>
          <p>{site.tagline}</p>
          <p className="site-footer__registration">Registration no. {site.registrationNumber}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <address className="site-footer__address">
          {site.address.line1}<br />
          {site.address.line2}<br />
          {site.address.suburb}, {site.address.city}<br />
          {site.address.country}
        </address>
      </Container>
      <Container className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Built around verified foundation information and genuine community media.</p>
      </Container>
    </footer>
  )
}
