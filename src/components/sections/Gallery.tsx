import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const images = [
  {
    src: '/media/gallery-classroom-3.webp',
    width: 900,
    height: 675,
    alt: 'Learners and adults together in a classroom during foundation activity',
    caption: 'A school visit documented through foundation photography.',
    className: 'gallery__feature',
  },
  {
    src: '/media/hero-community.webp',
    width: 1400,
    height: 1050,
    alt: 'Learners and adults together in a classroom during a foundation school visit',
    caption: 'Learners and community members during the visit.',
    className: 'gallery__portrait',
  },
  {
    src: '/media/gallery-classroom-2.webp',
    width: 900,
    height: 675,
    alt: 'Learners and adults gathered in a classroom with shoes visible nearby',
    caption: 'Documentary photography from the supplied outreach material.',
    className: 'gallery__support',
  },
] as const

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (activeIndex !== null && !dialog.open) dialog.showModal()
    if (activeIndex === null && dialog.open) dialog.close()
  }, [activeIndex])

  return (
    <section className="section gallery" id="gallery">
      <Container>
        <SectionHeading
          eyebrow="Documentary gallery"
          title="Real moments from the work."
          description="A small selection of photographs supplied by the foundation from a school visit."
        />
        <div className="gallery__grid">
          {images.map((image, index) => (
            <figure className={image.className} key={image.src}>
              <button type="button" className="gallery__button" onClick={() => setActiveIndex(index)}>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery__open">View image</span>
              </button>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Gallery image viewer"
        onClose={() => setActiveIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null)
        }}
      >
        {activeIndex !== null ? (
          <div className="lightbox__content">
            <button type="button" className="lightbox__close" onClick={() => setActiveIndex(null)} aria-label="Close image viewer">
              ×
            </button>
            <img
              src={images[activeIndex].src}
              width={images[activeIndex].width}
              height={images[activeIndex].height}
              alt={images[activeIndex].alt}
            />
            <p>{images[activeIndex].caption}</p>
          </div>
        ) : null}
      </dialog>
    </section>
  )
}
