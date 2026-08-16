import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section className="section about" id="about">
      <Container>
        <div className="about__grid">
          <div className="about__copy">
            <SectionHeading
              eyebrow="About the foundation"
              title="Support begins with being present."
              description="Pamela Teffo Foundation is a community foundation based in Mondeor, Johannesburg."
            />
            <p>
              The material supplied for this site shows a hands-on approach: foundation representatives spending time with learners in a school setting and providing practical learner support.
            </p>
            <p>
              The focus is simple and human—show up, respond to practical needs and treat every person with dignity. As more verified information becomes available, the foundation's story and activities can be documented here in greater detail.
            </p>
          </div>
          <figure className="about__image-wrap">
            <img
              src="/media/gallery-classroom-2.webp"
              alt="Learners and adults standing together in front of a classroom chalkboard"
              width="900"
              height="675"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </Container>
    </section>
  )
}
