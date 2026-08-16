import { useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

type SupportType = 'Donate' | 'Volunteer' | 'Partner'

const options: Array<{ title: SupportType; text: string }> = [
  { title: 'Donate', text: 'Support practical community and learner needs once verified donation details are published.' },
  { title: 'Volunteer', text: 'Offer your time and skills once the foundation publishes its volunteer process.' },
  { title: 'Partner', text: 'Explore responsible collaboration once verified foundation contact channels are available.' },
]

export function GetInvolved() {
  const [selected, setSelected] = useState<SupportType>('Donate')
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openDialog = (type: SupportType) => {
    setSelected(type)
    dialogRef.current?.showModal()
  }

  return (
    <section className="section get-involved" id="get-involved">
      <Container>
        <SectionHeading
          eyebrow="Get involved"
          title="Stand with the community in a practical way."
          description="Donation, volunteering and partnership details are being finalised and will be published once confirmed."
          tone="light"
        />
        <div className="get-involved__grid">
          {options.map((option) => (
            <article className="involvement-card" key={option.title}>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
              <button type="button" className="text-button" onClick={() => openDialog(option.title)}>
                View current status <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </Container>

      <dialog
        ref={dialogRef}
        className="status-dialog"
        aria-labelledby="support-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
      >
        <div className="status-dialog__content">
          <p className="eyebrow">{selected}</p>
          <h3 id="support-dialog-title">Details are being finalised.</h3>
          <p>
            Verified {selected === 'Donate' ? 'donation' : selected.toLowerCase()} details are not yet available for publication. Please check back once the foundation has confirmed them.
          </p>
          <button className="button button--primary" type="button" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
      </dialog>
    </section>
  )
}
