import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import galleryClassroom2 from './assets/gallery/gallery-classroom-2.webp'
import galleryClassroom3 from './assets/gallery/gallery-classroom-3.webp'
import galleryClassroom4 from './assets/gallery/gallery-classroom-4.webp'
import galleryClassroom5 from './assets/gallery/gallery-classroom-5.webp'
import heroCommunity from './assets/gallery/hero-community.webp'
import { navigation, site } from './data/site'

const ADDRESS = `${site.address.line1}, ${site.address.line2}, ${site.address.suburb}`
const FULL_ADDRESS = `${ADDRESS}, ${site.address.city}, ${site.address.country}`
const reveal = (delay = 0) => ({ '--reveal-delay': `${delay}ms` }) as CSSProperties
const focusable = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

function useDialogFocus(open: boolean, ref: RefObject<HTMLElement>, onClose: () => void) {
  const previous = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (!open) return
    previous.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const items = () => Array.from(ref.current?.querySelectorAll<HTMLElement>(focusable) ?? [])
    const timer = window.setTimeout(() => items()[0]?.focus(), 0)
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const first = list[0], last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', keydown)
      document.body.style.overflow = overflow
      previous.current?.focus()
    }
  }, [open, ref, onClose])
}

function useRevealMotion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: .16, rootMargin: '0px 0px -4% 0px' })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function Icon({ name }: { name: string }) {
  const p = { className: 'icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'map') return <svg {...p}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
  if (name === 'file') return <svg {...p}><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>
  if (name === 'mail') return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  if (name === 'phone') return <svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.4 1.7.6 2.6.7a2 2 0 0 1 2 2.3Z"/></svg>
  if (name === 'social') return <svg {...p}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg>
  if (name === 'arrow') return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  if (name === 'menu') return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  return <svg {...p}><path d="m6 6 12 12M18 6 6 18"/></svg>
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} aria-hidden="true"><span className="brand-mark__ring"/><span className="brand-mark__red"/></span>
}
function Wordmark({ compact = false }: { compact?: boolean }) {
  return <span className="wordmark"><BrandMark compact={compact}/><span className="wordmark__text"><strong>{site.name}</strong><span>{site.tagline.replace(/\.$/, '')}</span></span></span>
}
function Button({ children, href, onClick, variant = 'solid' }: { children: ReactNode; href?: string; onClick?: () => void; variant?: 'solid'|'outline'|'accent' }) {
  const cls = `pill pill--${variant}`
  return href ? <a href={href} className={cls}>{children}</a> : <button type="button" className={cls} onClick={onClick}>{children}</button>
}

function Header({ onGetInvolved }: { onGetInvolved: () => void }) {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  useDialogFocus(open, panel, close)
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 12)
    scroll(); window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])
  return <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
    <div className="shell header-inner">
      <a href="#home" className="brand-link" aria-label={`${site.name} home`}><Wordmark compact/></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <div className="desktop-cta"><Button variant="accent" onClick={onGetInvolved}>Get involved</Button></div>
      <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Icon name="menu"/></button>
    </div>
    {open && <div className="mobile-panel" ref={panel} role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="shell mobile-panel__top"><Wordmark compact/><button className="menu-button" type="button" onClick={close} aria-label="Close menu"><Icon name="close"/></button></div>
      <nav className="shell mobile-nav">{navigation.map((item) => <a key={item.href} href={item.href} onClick={close}>{item.label}</a>)}<Button variant="accent" onClick={() => { close(); onGetInvolved() }}>Get involved</Button></nav>
    </div>}
  </header>
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>
}

function Hero({ onGetInvolved }: { onGetInvolved: () => void }) {
  return <section id="home" className="hero-section section-border"><div className="shell hero-grid">
    <div className="hero-copy reveal" data-reveal><p className="eyebrow">{site.organisationType}</p><h1>Practical support. Dignity. Stronger communities.</h1><p className="hero-intro">{site.profileSummary}</p><div className="hero-actions"><Button href="#work">See our work <Icon name="arrow"/></Button><Button variant="outline" onClick={onGetInvolved}>Get involved</Button></div></div>
    <div className="registration-wrap reveal" data-reveal style={reveal(90)}><span className="orb orb--gold"/><span className="orb orb--red"/><article className="registration-card interactive-card"><h2>Registered non-profit organisation</h2><dl><div><Icon name="file"/><span><dt>Registration no.</dt><dd>{site.registrationNumber}</dd></span></div><div><Icon name="map"/><span><dt>Based in</dt><dd>{site.address.suburb}, {site.address.city}</dd></span></div></dl><p>{site.mission}</p></article></div>
  </div></section>
}

function About() {
  return <section id="about" className="about-section section-border"><div className="shell section-pad">
    <div className="two-column reveal" data-reveal><SectionHeading eyebrow="About us" title={site.tagline}/><div className="body-copy"><p>{site.about}</p><p>{site.belief}</p></div></div>
    <div className="profile-grid"><article className="profile-card reveal interactive-card" data-reveal><span className="profile-card__label">Our vision</span><h3>Empowered communities</h3><p>{site.vision}</p></article><article className="profile-card reveal interactive-card" data-reveal style={reveal(70)}><span className="profile-card__label">Our mission</span><h3>Assistance with dignity</h3><p>{site.mission}</p></article></div>
  </div></section>
}

const WORK = [
  ['Donations','Practical support for children, families and communities through donated essentials.'],
  ['Outreach programmes','Community and school outreach focused on meeting real needs with dignity and care.'],
  ['Development initiatives','Initiatives that help people and communities build opportunity, confidence and wellbeing.'],
]
function OurWork() {
  return <section id="work" className="section-border"><div className="shell section-pad">
    <div className="reveal" data-reveal><SectionHeading eyebrow="Our work" title="Support that meets practical needs" intro="Through donations, outreach programmes and development initiatives, we support children, families and communities with practical help."/></div>
    <ul className="work-grid">{WORK.map(([title, body], index) => <li className="reveal interactive-card" data-reveal style={reveal(index*70)} key={title}><span className={`work-rule work-rule--${index+1}`}/><h3>{title}</h3><p>{body}</p></li>)}</ul>
    <div className="needs-block"><div className="needs-heading reveal" data-reveal><div><p className="eyebrow">Current needs</p><h2>How you can help right now</h2></div><p>Priority items currently include school shoes, clean wearable clothing, canned food and basketballs.</p></div>
      <ol className="needs-grid">{site.currentNeeds.map((need, index) => <li className="need-card reveal interactive-card" data-reveal style={reveal(index*60)} key={need.title}><span className="need-index">{index+1}</span><h3>{need.title}</h3><p>{need.description}</p></li>)}</ol>
    </div>
  </div></section>
}

const GALLERY = [
  { src: galleryClassroom3, alt: 'Learners and adults together in a classroom during a foundation activity', caption: 'Learners and adults together during a school outreach visit.' },
  { src: heroCommunity, alt: 'Learners and adults together in a classroom during a school visit', caption: 'A group moment from the school outreach.' },
  { src: galleryClassroom2, alt: 'Learners and adults gathered in a classroom with shoes visible nearby', caption: 'Practical school support during an outreach visit.' },
  { src: galleryClassroom4, alt: 'Learners and adults gathered for a wider classroom group photograph', caption: 'A wider view from the school outreach.' },
  { src: galleryClassroom5, alt: 'Learners and adults standing together during the school outreach', caption: 'Together during a school outreach activity.' },
]
function Gallery() {
  const [active, setActive] = useState<number|null>(null), [start, setStart] = useState(0), [visible, setVisible] = useState(3), [prev, setPrev] = useState(false), [next, setNext] = useState(true)
  const rail = useRef<HTMLDivElement>(null), lightbox = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setActive(null), [])
  useDialogFocus(active !== null, lightbox, close)
  const sync = useCallback(() => {
    const el = rail.current, card = el?.querySelector<HTMLElement>('.gallery-card')
    if (!el || !card) return
    const step = card.offsetWidth + 20, max = Math.max(0, el.scrollWidth-el.clientWidth)
    setStart(Math.max(0, Math.round(el.scrollLeft/step)))
    setVisible(Math.max(1, Math.min(GALLERY.length, Math.round((el.clientWidth+20)/step))))
    setPrev(el.scrollLeft > 8); setNext(el.scrollLeft < max-8)
  }, [])
  useEffect(() => {
    const el = rail.current
    if (!el) return
    let frame = 0
    const change = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(sync) }
    sync(); el.addEventListener('scroll', change, { passive: true }); window.addEventListener('resize', change)
    return () => { cancelAnimationFrame(frame); el.removeEventListener('scroll', change); window.removeEventListener('resize', change) }
  }, [sync])
  const scroll = (dir: number) => {
    const el = rail.current, card = el?.querySelector<HTMLElement>('.gallery-card')
    if (el) el.scrollBy({ left: dir*(card ? card.offsetWidth+20 : el.clientWidth*.8), behavior: 'smooth' })
  }
  const previous = useCallback(() => setActive((i) => i === null ? null : (i-1+GALLERY.length)%GALLERY.length), [])
  const following = useCallback(() => setActive((i) => i === null ? null : (i+1)%GALLERY.length), [])
  useEffect(() => {
    if (active === null) return
    const keys = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') previous(); if (e.key === 'ArrowRight') following() }
    window.addEventListener('keydown', keys); return () => window.removeEventListener('keydown', keys)
  }, [active, previous, following])
  const end = Math.min(GALLERY.length, start+visible)
  return <section id="gallery" className="gallery-section section-border"><div className="shell section-pad">
    <div className="reveal" data-reveal><SectionHeading eyebrow="From the community" title="Our work in the community" intro="A glimpse of school and community outreach through moments captured during foundation activities."/></div>
    <div className="gallery-toolbar reveal" data-reveal><p>Swipe on mobile, scroll horizontally, or use the arrows to explore the gallery.</p><div className="gallery-toolbar__meta"><span className="gallery-count" aria-live="polite">{Math.min(GALLERY.length,start+1)}–{end} of {GALLERY.length}</span><div className="gallery-controls"><button type="button" onClick={() => scroll(-1)} disabled={!prev}>←</button><button type="button" onClick={() => scroll(1)} disabled={!next}>→</button></div></div></div>
    <div className="gallery-rail" ref={rail} tabIndex={0}>{GALLERY.map((image,index) => <figure className="gallery-card reveal" data-reveal style={reveal(index*50)} key={image.src}><button type="button" onClick={() => setActive(index)}><img src={image.src} alt={image.alt} loading="lazy" decoding="async"/><span>View image</span></button><figcaption>{image.caption}</figcaption></figure>)}</div>
  </div>{active !== null && <div className="lightbox" onClick={close}><div className="lightbox__inner" ref={lightbox} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><button className="lightbox__close" onClick={close}>×</button><button className="lightbox__nav lightbox__nav--prev" onClick={previous}>‹</button><img src={GALLERY[active].src} alt={GALLERY[active].alt}/><button className="lightbox__nav lightbox__nav--next" onClick={following}>›</button><div className="lightbox__caption"><p>{GALLERY[active].caption}</p><span>{active+1} / {GALLERY.length}</span></div></div></div>}</section>
}

function GetInvolved({ onOpen }: { onOpen: (topic: string) => void }) {
  const items = [['Donate essentials','Support one of the foundation’s current priority needs.'],['Volunteer','Offer your time for outreach programmes and community activities.'],['Partner with us','Work alongside the foundation on community support and development initiatives.']]
  return <section id="get-involved" className="involved-section section-border"><div className="shell section-pad"><div className="involved-heading reveal" data-reveal><p className="eyebrow eyebrow--gold">Get involved</p><h2>Support the work</h2><p>Want to donate items, volunteer or explore a partnership? Contact the foundation to coordinate the best way to help.</p></div><ul className="involved-grid">{items.map(([label,body],index) => <li className="reveal interactive-card" data-reveal style={reveal(index*70)} key={label}><h3>{label}</h3><p>{body}</p><button type="button" onClick={() => onOpen(label)}>Contact us <Icon name="arrow"/></button></li>)}</ul></div></section>
}

function Contact() {
  return <section id="contact"><div className="shell section-pad"><div className="two-column contact-grid reveal" data-reveal>
    <SectionHeading eyebrow="Contact" title="Get in touch" intro="Contact the foundation by phone, email or Facebook, or find us in Mondeor, Johannesburg."/>
    <div className="contact-card interactive-card"><dl>
      <div><Icon name="map"/><span><dt>Address</dt><dd>{FULL_ADDRESS}</dd></span></div>
      <div><Icon name="phone"/><span><dt>Phone</dt><dd><a className="contact-value" href={`tel:${site.phone.href}`}>{site.phone.display}</a></dd></span></div>
      <div><Icon name="mail"/><span><dt>Email</dt><dd><a className="contact-value" href={`mailto:${site.email}`}>{site.email}</a></dd></span></div>
      <div><Icon name="social"/><span><dt>Facebook</dt><dd><a className="contact-value" href={site.facebookUrl} target="_blank" rel="noreferrer noopener">{site.facebookName}</a></dd></span></div>
      <div><Icon name="file"/><span><dt>Registration no.</dt><dd>{site.registrationNumber}</dd></span></div>
    </dl><a className="map-link" href={site.mapUrl} target="_blank" rel="noreferrer noopener">Open address in maps <Icon name="arrow"/></a></div>
  </div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><div><Wordmark/><p>Registration no. {site.registrationNumber}</p><p>{ADDRESS}</p><div className="footer-contact"><a href={`tel:${site.phone.href}`}>{site.phone.display}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.facebookUrl} target="_blank" rel="noreferrer noopener">Facebook</a></div></div><nav>{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div><div className="shell copyright">© {new Date().getFullYear()} {site.name}. All rights reserved.</div></footer>
}

function Modal({ topic, onClose }: { topic: string|null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useDialogFocus(topic !== null, ref, onClose)
  if (!topic) return null
  return <div className="modal" onClick={onClose}><div className="modal__card" ref={ref} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><button className="modal__close" onClick={onClose}>×</button><h2>{topic}</h2><p>Contact the foundation so the team can coordinate what is currently needed and the best way to contribute.</p><div className="modal__contacts"><a href={`mailto:${site.email}?subject=${encodeURIComponent(`${topic} enquiry`)}`}><Icon name="mail"/> Email us</a><a href={`tel:${site.phone.href}`}><Icon name="phone"/> {site.phone.display}</a><a href={site.facebookUrl} target="_blank" rel="noreferrer noopener"><Icon name="social"/> Facebook</a></div><div className="modal__address">{FULL_ADDRESS}<br/><span>Registration no. {site.registrationNumber}</span></div></div></div>
}

export default function App() {
  const [topic, setTopic] = useState<string|null>(null)
  const close = useCallback(() => setTopic(null), [])
  useRevealMotion()
  return <><a className="skip-link" href="#home">Skip to content</a><Header onGetInvolved={() => setTopic('Get involved')}/><main><Hero onGetInvolved={() => setTopic('Get involved')}/><About/><OurWork/><Gallery/><GetInvolved onOpen={setTopic}/><Contact/></main><Footer/><Modal topic={topic} onClose={close}/></>
}
