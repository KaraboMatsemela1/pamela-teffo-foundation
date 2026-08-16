import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'
import galleryClassroom2 from './assets/gallery/gallery-classroom-2.webp'
import galleryClassroom3 from './assets/gallery/gallery-classroom-3.webp'
import galleryClassroom4 from './assets/gallery/gallery-classroom-4.webp'
import galleryClassroom5 from './assets/gallery/gallery-classroom-5.webp'
import heroCommunity from './assets/gallery/hero-community.webp'
import { navigation, site } from './data/site'

const ADDRESS = `${site.address.line1}, ${site.address.line2}, ${site.address.suburb}`
const FULL_ADDRESS = `${ADDRESS}, ${site.address.city}, ${site.address.country}`
const REVEAL_STYLE = (delay: number) => ({ '--reveal-delay': `${delay}ms` }) as CSSProperties
const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

function useDialogFocus(open: boolean, containerRef: RefObject<HTMLElement>, onClose: () => void) {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
      )

    const focusTimer = window.setTimeout(() => getFocusable()[0]?.focus(), 0)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = getFocusable()
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [containerRef, onClose, open])
}

function useRevealMotion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!elements.length) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.16, rootMargin: '0px 0px -4% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function Icon({ name, className = '' }: { name: string; className?: string }) {
  const common = {
    className: `icon ${className}`,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (name === 'map')
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  if (name === 'file')
    return (
      <svg {...common}>
        <path d="M6 2h8l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
      </svg>
    )
  if (name === 'mail')
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  if (name === 'phone')
    return (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.4 1.7.6 2.6.7a2 2 0 0 1 2 2.3Z" />
      </svg>
    )
  if (name === 'social')
    return (
      <svg {...common}>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
      </svg>
    )
  if (name === 'arrow')
    return (
      <svg {...common}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    )
  if (name === 'menu')
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    )
  if (name === 'close')
    return (
      <svg {...common}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    )
  return null
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} aria-hidden="true">
      <span className="brand-mark__ring" />
      <span className="brand-mark__red" />
    </span>
  )
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="wordmark">
      <BrandMark compact={compact} />
      <span className="wordmark__text">
        <strong>{site.name}</strong>
        <span>{site.tagline.replace(/\.$/, '')}</span>
      </span>
    </span>
  )
}

function Button({
  children,
  href,
  onClick,
  variant = 'solid',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'accent'
}) {
  const className = `pill pill--${variant}`
  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

function Header({ onGetInvolved }: { onGetInvolved: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeMenu = useCallback(() => setOpen(false), [])
  useDialogFocus(open, panelRef, closeMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="shell header-inner">
        <a href="#home" className="brand-link" aria-label={`${site.name} home`}>
          <Wordmark compact />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="desktop-cta">
          <Button variant="accent" onClick={onGetInvolved}>
            Get involved
          </Button>
        </div>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Icon name="menu" />
        </button>
      </div>
      {open && (
        <div
          className="mobile-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="shell mobile-panel__top">
            <Wordmark compact />
            <button className="menu-button" type="button" onClick={closeMenu} aria-label="Close menu">
              <Icon name="close" />
            </button>
          </div>
          <nav className="shell mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <Button
              variant="accent"
              onClick={() => {
                closeMenu()
                onGetInvolved()
              }}
            >
              Get involved
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}

function Hero({ onGetInvolved }: { onGetInvolved: () => void }) {
  return (
    <section id="home" className="hero-section section-border">
      <div className="shell hero-grid">
        <div className="hero-copy reveal" data-reveal>
          <p className="eyebrow">{site.organisationType} · South Africa</p>
          <h1>Practical support. Dignity. Stronger communities.</h1>
          <p className="hero-intro">{site.profileSummary}</p>
          <div className="hero-actions">
            <Button href="#work">
              See our work <Icon name="arrow" />
            </Button>
            <Button variant="outline" onClick={onGetInvolved}>
              Get involved
            </Button>
          </div>
        </div>
        <div className="registration-wrap reveal" data-reveal style={REVEAL_STYLE(90)}>
          <span className="orb orb--gold" aria-hidden="true" />
          <span className="orb orb--red" aria-hidden="true" />
          <article className="registration-card interactive-card">
            <h2>Registered non-profit organisation</h2>
            <dl>
              <div>
                <Icon name="file" />
                <span>
                  <dt>Registration no.</dt>
                  <dd>{site.registrationNumber}</dd>
                </span>
              </div>
              <div>
                <Icon name="map" />
                <span>
                  <dt>Based in</dt>
                  <dd>
                    {site.address.suburb}, {site.address.city}
                  </dd>
                </span>
              </div>
            </dl>
            <p>{site.mission}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about-section section-border">
      <div className="shell section-pad">
        <div className="two-column reveal" data-reveal>
          <SectionHeading eyebrow="About us" title={site.tagline} />
          <div className="body-copy">
            <p>{site.about}</p>
            <p>{site.belief}</p>
          </div>
        </div>
        <div className="profile-grid">
          <article className="profile-card reveal interactive-card" data-reveal>
            <span className="profile-card__label">Our vision</span>
            <h3>Empowered communities</h3>
            <p>{site.vision}</p>
          </article>
          <article
            className="profile-card reveal interactive-card"
            data-reveal
            style={REVEAL_STYLE(70)}
          >
            <span className="profile-card__label">Our mission</span>
            <h3>Assistance with dignity</h3>
            <p>{site.mission}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

const WORK = [
  [
    'Donations',
    'Providing practical support to children, families and communities through donated essentials.',
  ],
  [
    'Outreach programmes',
    'Showing up in communities and schools with direct, people-centred support.',
  ],
  [
    'Development initiatives',
    'Supporting initiatives intended to help people and communities build opportunity and thrive.',
  ],
]

function OurWork() {
  return (
    <section id="work" className="section-border">
      <div className="shell section-pad">
        <div className="reveal" data-reveal>
          <SectionHeading
            eyebrow="Our work"
            title="Support that meets practical needs"
            intro="The foundation profile identifies donations, outreach programmes and development initiatives as the main ways it supports children, families and communities."
          />
        </div>
        <ul className="work-grid">
          {WORK.map(([title, body], index) => (
            <li
              className="reveal interactive-card"
              data-reveal
              style={REVEAL_STYLE(index * 70)}
              key={title}
            >
              <span className={`work-rule work-rule--${index + 1}`} />
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>

        <div className="needs-block">
          <div className="needs-heading reveal" data-reveal>
            <div>
              <p className="eyebrow">Current needs</p>
              <h2>What the foundation is asking for</h2>
            </div>
            <p>These needs are listed in the foundation profile supplied for this website.</p>
          </div>
          <ol className="needs-grid">
            {site.currentNeeds.map((need, index) => (
              <li
                className="need-card reveal interactive-card"
                data-reveal
                style={REVEAL_STYLE(index * 60)}
                key={need.title}
              >
                <span className="need-index">{index + 1}</span>
                <h3>{need.title}</h3>
                <p>{need.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

const GALLERY = [
  {
    src: galleryClassroom3,
    alt: 'Learners and adults together in a classroom during foundation activity',
    caption: 'School outreach documented through foundation photography.',
  },
  {
    src: heroCommunity,
    alt: 'Learners and adults together in a classroom during a foundation school visit',
    caption: 'A group photograph from the school visit.',
  },
  {
    src: galleryClassroom2,
    alt: 'Learners and adults gathered in a classroom with shoes visible nearby',
    caption: 'Documentary photography from the supplied outreach material.',
  },
  {
    src: galleryClassroom4,
    alt: 'Learners and adults gathered for a wider classroom group photograph',
    caption: 'A wider view from the same school outreach.',
  },
  {
    src: galleryClassroom5,
    alt: 'Learners and adults standing together during the school outreach',
    caption: 'Another supplied photograph from the school visit.',
  },
]

function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const [railStart, setRailStart] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [canPrevious, setCanPrevious] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const railRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const closeLightbox = useCallback(() => setActive(null), [])
  const showPrevious = useCallback(
    () =>
      setActive((current) =>
        current === null ? null : (current - 1 + GALLERY.length) % GALLERY.length,
      ),
    [],
  )
  const showNext = useCallback(
    () =>
      setActive((current) => (current === null ? null : (current + 1) % GALLERY.length)),
    [],
  )
  useDialogFocus(active !== null, lightboxRef, closeLightbox)

  const syncRailState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>('.gallery-card')
    if (!card) return
    const gap = 20
    const step = card.offsetWidth + gap
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth)
    const start = Math.min(
      GALLERY.length - 1,
      Math.max(0, Math.round(rail.scrollLeft / step)),
    )
    const visible = Math.max(
      1,
      Math.min(GALLERY.length, Math.round((rail.clientWidth + gap) / step)),
    )
    setRailStart(start)
    setVisibleCount(visible)
    setCanPrevious(rail.scrollLeft > 8)
    setCanNext(rail.scrollLeft < maxScroll - 8)
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let frame = 0
    const onChange = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(syncRailState)
    }
    syncRailState()
    rail.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange)
    return () => {
      window.cancelAnimationFrame(frame)
      rail.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [syncRailState])

  useEffect(() => {
    if (active === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, showNext, showPrevious])

  const scrollGallery = (direction: 'previous' | 'next') => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>('.gallery-card')
    const amount = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8
    rail.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  const end = Math.min(GALLERY.length, railStart + visibleCount)
  const start = Math.min(GALLERY.length, railStart + 1)

  return (
    <section id="gallery" className="gallery-section section-border">
      <div className="shell section-pad">
        <div className="reveal" data-reveal>
          <SectionHeading
            eyebrow="From the community"
            title="Our work in the community"
            intro="These photographs were supplied by the foundation and document its outreach activity. Nothing in this gallery is stock or AI-generated imagery."
          />
        </div>
        <div className="gallery-toolbar reveal" data-reveal>
          <p>Swipe on mobile, scroll horizontally, or use the arrows to view the full gallery.</p>
          <div className="gallery-toolbar__meta">
            <span className="gallery-count" aria-live="polite">
              {start}–{end} of {GALLERY.length}
            </span>
            <div className="gallery-controls" aria-label="Gallery controls">
              <button
                type="button"
                onClick={() => scrollGallery('previous')}
                aria-label="Previous gallery images"
                disabled={!canPrevious}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollGallery('next')}
                aria-label="Next gallery images"
                disabled={!canNext}
              >
                →
              </button>
            </div>
          </div>
        </div>
        <div className="gallery-rail" ref={railRef} tabIndex={0} aria-label="Foundation image gallery">
          {GALLERY.map((image, index) => (
            <figure
              className="gallery-card reveal"
              data-reveal
              style={REVEAL_STYLE(index * 50)}
              key={image.src}
            >
              <button type="button" onClick={() => setActive(index)} aria-label={`Open ${image.alt}`}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <span>View image</span>
              </button>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {active !== null && (
        <div className="lightbox" role="presentation" onClick={closeLightbox}>
          <div
            className="lightbox__inner"
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-dialog-caption"
            onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <button
              className="lightbox__close"
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              ×
            </button>
            <button
              className="lightbox__nav lightbox__nav--prev"
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img src={GALLERY[active].src} alt={GALLERY[active].alt} />
            <button
              className="lightbox__nav lightbox__nav--next"
              type="button"
              onClick={showNext}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="lightbox__caption" id="gallery-dialog-caption">
              <p>{GALLERY[active].caption}</p>
              <span>
                {active + 1} / {GALLERY.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function GetInvolved({ onOpen }: { onOpen: (topic: string) => void }) {
  const options = [
    ['Donate essentials', 'Support one of the current needs listed by the foundation.'],
    ['Volunteer', 'Offer your time for outreach programmes and community activities.'],
    ['Partner with us', 'Work alongside the foundation on community support and development initiatives.'],
  ]

  return (
    <section id="get-involved" className="involved-section section-border">
      <div className="shell section-pad">
        <div className="involved-heading reveal" data-reveal>
          <p className="eyebrow eyebrow--gold">Get involved</p>
          <h2>Support the work</h2>
          <p>
            The foundation now has verified phone and email contact details. Reach out before donating items,
            volunteering or proposing a partnership so the team can confirm the current need.
          </p>
        </div>
        <ul className="involved-grid">
          {options.map(([label, body], index) => (
            <li
              className="reveal interactive-card"
              data-reveal
              style={REVEAL_STYLE(index * 70)}
              key={label}
            >
              <h3>{label}</h3>
              <p>{body}</p>
              <button type="button" onClick={() => onOpen(label)}>
                Contact us <Icon name="arrow" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact">
      <div className="shell section-pad">
        <div className="two-column contact-grid reveal" data-reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            intro="These contact details are taken from the foundation profile supplied for this website."
          />
          <div className="contact-card interactive-card">
            <dl>
              <div>
                <Icon name="map" />
                <span>
                  <dt>Address</dt>
                  <dd>{FULL_ADDRESS}</dd>
                </span>
              </div>
              <div>
                <Icon name="phone" />
                <span>
                  <dt>Phone</dt>
                  <dd>
                    <a className="contact-value" href={`tel:${site.phone.href}`}>
                      {site.phone.display}
                    </a>
                  </dd>
                </span>
              </div>
              <div>
                <Icon name="mail" />
                <span>
                  <dt>Email</dt>
                  <dd>
                    <a className="contact-value" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </span>
              </div>
              <div>
                <Icon name="social" />
                <span>
                  <dt>Facebook</dt>
                  <dd>{site.facebookName}</dd>
                </span>
              </div>
              <div>
                <Icon name="file" />
                <span>
                  <dt>Registration no.</dt>
                  <dd>{site.registrationNumber}</dd>
                </span>
              </div>
            </dl>
            <a className="map-link" href={site.mapUrl} target="_blank" rel="noreferrer noopener">
              Open address in maps <Icon name="arrow" />
            </a>
            <p className="contact-note">
              No bank account or online payment details are published on this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>
          <Wordmark />
          <p>Registration no. {site.registrationNumber}</p>
          <p>{ADDRESS}</p>
          <div className="footer-contact">
            <a href={`tel:${site.phone.href}`}>{site.phone.display}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="shell copyright">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}

function Modal({ topic, onClose }: { topic: string | null; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  useDialogFocus(topic !== null, cardRef, onClose)
  if (!topic) return null

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__card"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="modal-title">{topic}</h2>
        <p>
          Contact the foundation before arranging a contribution or visit so the team can confirm what is
          currently needed and how best to help.
        </p>
        <div className="modal__contacts">
          <a href={`mailto:${site.email}?subject=${encodeURIComponent(`${topic} enquiry`)}`}>
            <Icon name="mail" /> Email the foundation
          </a>
          <a href={`tel:${site.phone.href}`}>
            <Icon name="phone" /> {site.phone.display}
          </a>
        </div>
        <div className="modal__address">
          {FULL_ADDRESS}
          <br />
          <span>Registration no. {site.registrationNumber}</span>
        </div>
        <p>No bank account or online payment details are published on this site.</p>
      </div>
    </div>
  )
}

export default function App() {
  const [topic, setTopic] = useState<string | null>(null)
  const closeModal = useCallback(() => setTopic(null), [])
  useRevealMotion()

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Header onGetInvolved={() => setTopic('Get involved')} />
      <main>
        <Hero onGetInvolved={() => setTopic('Get involved')} />
        <About />
        <OurWork />
        <Gallery />
        <GetInvolved onOpen={setTopic} />
        <Contact />
      </main>
      <Footer />
      <Modal topic={topic} onClose={closeModal} />
    </>
  )
}
