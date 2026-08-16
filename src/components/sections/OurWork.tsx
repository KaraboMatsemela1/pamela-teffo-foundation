import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const workItems = [
  {
    number: '01',
    title: 'School outreach',
    description: 'The supplied material documents in-person foundation activity with learners in a school setting.',
  },
  {
    number: '02',
    title: 'Practical learner support',
    description: 'Foundation footage shows footwear being provided and fitted as part of direct learner support.',
  },
  {
    number: '03',
    title: 'Community presence',
    description: 'The work is grounded in being physically present with the people and school communities being supported.',
  },
] as const

export function OurWork() {
  return (
    <section className="section work" id="work">
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Practical support, documented as it happens."
          description="We describe only the work supported by the foundation's supplied media and verified information."
        />
        <div className="work__list">
          {workItems.map((item) => (
            <article className="work-item" key={item.number}>
              <span className="work-item__number" aria-hidden="true">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
