import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <Container className="contact__grid">
        <div>
          <SectionHeading
            eyebrow="Contact & location"
            title="Visit our verified location."
            description="Only contact information supplied and verified by the foundation is published here."
          />
          <div className="contact__notice" role="note">
            <strong>Phone and email:</strong> awaiting verified foundation details.
          </div>
        </div>
        <div className="contact-card">
          <p className="contact-card__name">{site.name}</p>
          <address>
            {site.address.line1}<br />
            {site.address.line2}<br />
            {site.address.suburb}<br />
            {site.address.city}<br />
            {site.address.country}
          </address>
          <p className="contact-card__registration">Registration no. {site.registrationNumber}</p>
          <a className="button button--outline" href={site.mapUrl} target="_blank" rel="noreferrer">
            Open in Maps <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
