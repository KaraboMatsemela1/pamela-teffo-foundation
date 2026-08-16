import { useEffect, useState } from 'react'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Get Involved', href: '#get-involved' },
  { label: 'Contact', href: '#contact' },
]

const REG_NO = '2025/683667/08'
const ADDRESS = 'Unit 27 Lake Mondeor, 49 John Masefield Drive, Mondeor'

function Icon({ name, className = '' }: { name: string; className?: string }) {
  const common = { className: `icon ${className}`, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'map') return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
  if (name === 'file') return <svg {...common}><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  if (name === 'phone') return <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.4 1.7.6 2.6.7a2 2 0 0 1 2 2.3Z"/></svg>
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  if (name === 'menu') return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>
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
        <strong>Pamela Teffo Foundation</strong>
        <span>our pride is our people</span>
      </span>
    </span>
  )
}

function Button({ children, href, onClick, variant = 'solid' }: { children: React.ReactNode; href?: string; onClick?: () => void; variant?: 'solid' | 'outline' | 'accent' }) {
  const className = `pill pill--${variant}`
  if (href) return <a href={href} className={className}>{children}</a>
  return <button type="button" className={className} onClick={onClick}>{children}</button>
}

function Header({ onGetInvolved }: { onGetInvolved: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="shell header-inner">
        <a href="#home" className="brand-link" aria-label="Pamela Teffo Foundation home"><Wordmark compact /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="desktop-cta"><Button variant="accent" onClick={onGetInvolved}>Get involved</Button></div>
        <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Icon name="menu" /></button>
      </div>
      {open && (
        <div className="mobile-panel">
          <div className="shell mobile-panel__top">
            <Wordmark compact />
            <button className="menu-button" type="button" onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
          </div>
          <nav className="shell mobile-nav" aria-label="Mobile navigation">
            {NAV.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
            <Button variant="accent" onClick={() => { setOpen(false); onGetInvolved() }}>Get involved</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>
}

function Hero({ onGetInvolved }: { onGetInvolved: () => void }) {
  return (
    <section id="home" className="hero-section section-border">
      <div className="shell hero-grid">
        <div className="hero-copy rise">
          <p className="eyebrow">Pamela Teffo Foundation · South Africa</p>
          <h1>Practical support. Dignity. Stronger communities.</h1>
          <p className="hero-intro">We support people and communities through direct outreach and practical assistance. Our most recent documented activity has been school-focused work with learners, captured in photos and video from the day itself.</p>
          <div className="hero-actions">
            <Button href="#work">See our work <Icon name="arrow" /></Button>
            <Button variant="outline" onClick={onGetInvolved}>Get involved</Button>
          </div>
        </div>
        <div className="registration-wrap">
          <span className="orb orb--gold" aria-hidden="true" />
          <span className="orb orb--red" aria-hidden="true" />
          <article className="registration-card">
            <h2>Registered and locally grounded</h2>
            <dl>
              <div><Icon name="file" /><span><dt>Registration no.</dt><dd>{REG_NO}</dd></span></div>
              <div><Icon name="map" /><span><dt>Based in</dt><dd>Mondeor, Johannesburg</dd></span></div>
            </dl>
            <p>We would rather show real work than make big claims. Everything published here is either verified or clearly marked as still to come.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

const PRINCIPLES = [
  ['01', 'Listen', 'We start with the people closest to the need.'],
  ['02', 'Show up', 'We go to the community, in person, on the day.'],
  ['03', 'Support', 'We give practical help that can be used immediately.'],
  ['04', 'Follow through', 'We stay in contact after the handover.'],
]

function About() {
  return (
    <section id="about" className="about-section section-border">
      <div className="shell section-pad">
        <div className="two-column">
          <SectionHeading eyebrow="About us" title="Our pride is our people." />
          <div className="body-copy"><p>The Pamela Teffo Foundation is a community-focused South African foundation. Our work is simple in shape: identify a real need close to home, and meet it with practical help that protects people's dignity.</p><p>We are locally grounded rather than nationally spread, and we would rather do a smaller amount of honest, visible work than promise more than we can deliver. As the foundation grows, our reporting on this site will grow with it.</p></div>
        </div>
        <div className="principles"><h3>How we work</h3><ol>{PRINCIPLES.map(([step,title,body]) => <li key={step}><span>{step}</span><h4>{title}</h4><p>{body}</p></li>)}</ol></div>
      </div>
    </section>
  )
}

const WORK = [
  ['School support', 'School shoes, clothing and uniform-related support handed to learners during school-based outreach, documented in our own media.'],
  ['Community outreach', 'Direct, on-the-ground support where a need has been identified by the community itself.'],
  ['Dignity & essentials', 'Practical items that help people take part in school and community life without embarrassment.'],
]

function OurWork() {
  return (
    <section id="work" className="section-border"><div className="shell section-pad"><SectionHeading eyebrow="Our work" title="What we actually do" intro="These are the areas our documented activity covers. We will only add new programmes here once there is real work behind them." /><ul className="work-grid">{WORK.map(([title, body], i) => <li key={title}><span className={`work-rule work-rule--${i + 1}`} /><h3>{title}</h3><p>{body}</p></li>)}</ul><p className="coming-soon">Programme schedules and future outreach dates: details coming soon.</p></div></section>
  )
}

const GALLERY = [
  { src: '/media/gallery-classroom-3.webp', alt: 'Learners and adults together in a classroom during foundation activity', caption: 'A school visit documented through foundation photography.' },
  { src: '/media/hero-community.webp', alt: 'Learners and adults together in a classroom during a foundation school visit', caption: 'Learners and community members during the visit.' },
  { src: '/media/gallery-classroom-2.webp', alt: 'Learners and adults gathered in a classroom with shoes visible nearby', caption: 'Documentary photography from the supplied outreach material.' },
]

function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <section id="gallery" className="gallery-section section-border"><div className="shell section-pad"><SectionHeading eyebrow="From the community" title="Our work in the community" intro="Photos and video recorded during the foundation's own outreach. Nothing in this gallery is stock or AI-generated imagery." />
      <div className="video-card"><video controls preload="metadata" poster="/media/video-poster.webp" playsInline aria-label="Footwear support during a school outreach visit"><source src="/media/learner-footwear-support.mp4" type="video/mp4" />Your browser does not support embedded video.</video><div><span className="eyebrow">Real field video</span><h3>Practical support, up close.</h3><p>A short clip from the supplied outreach footage documents footwear support for a learner. It does not autoplay.</p></div></div>
      <div className="photo-grid">{GALLERY.map((image, index) => <figure key={image.src}><button type="button" onClick={() => setActive(index)} aria-label={`Open ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" /><span>View image</span></button><figcaption>{image.caption}</figcaption></figure>)}</div>
    </div>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setActive(null)}><div className="lightbox__inner" onClick={(e) => e.stopPropagation()}><button type="button" onClick={() => setActive(null)} aria-label="Close image viewer">×</button><img src={GALLERY[active].src} alt={GALLERY[active].alt} /><p>{GALLERY[active].caption}</p></div></div>}
    </section>
  )
}

function GetInvolved({ onOpen }: { onOpen: (topic: string) => void }) {
  const options = [['Donate','Give towards the next outreach.'],['Volunteer','Offer your time on the day.'],['Partner with us','Bring your organisation alongside ours.']]
  return <section id="get-involved" className="involved-section section-border"><div className="shell section-pad"><div className="involved-heading"><p className="eyebrow eyebrow--gold">Get involved</p><h2>Support the work</h2><p>If you would like to contribute, lend a hand or work with us, reach out and we will come back to you directly.</p></div><ul className="involved-grid">{options.map(([label, body]) => <li key={label}><h3>{label}</h3><p>{body}</p><button type="button" onClick={() => onOpen(label)}>{label} <Icon name="arrow" /></button></li>)}</ul></div></section>
}

function Contact() {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ADDRESS}, Johannesburg, South Africa`)}`
  return <section id="contact"><div className="shell section-pad"><div className="two-column contact-grid"><SectionHeading eyebrow="Contact" title="Where to find us" intro="Our registered details are below. Contact channels are being set up and will be published here as soon as they are confirmed." /><div className="contact-card"><dl><div><Icon name="map" /><span><dt>Address</dt><dd>{ADDRESS}</dd></span></div><div><Icon name="file" /><span><dt>Registration no.</dt><dd>{REG_NO}</dd></span></div><div><Icon name="mail" className="icon--muted" /><span><dt>Email</dt><dd>Email details coming soon</dd></span></div><div><Icon name="phone" className="icon--muted" /><span><dt>Phone</dt><dd>Phone details coming soon</dd></span></div></dl><a className="map-link" href={mapHref} target="_blank" rel="noreferrer noopener">Open address in maps <Icon name="arrow" /></a></div></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><div><Wordmark /><p>Registration no. {REG_NO}</p><p>{ADDRESS}</p></div><nav aria-label="Footer navigation">{NAV.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div><div className="shell copyright">© {new Date().getFullYear()} Pamela Teffo Foundation. All rights reserved.</div></footer>
}

function Modal({ topic, onClose }: { topic: string | null; onClose: () => void }) {
  if (!topic) return null
  return <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}><div className="modal__card" onClick={(e) => e.stopPropagation()}><button className="modal__close" type="button" onClick={onClose} aria-label="Close">×</button><h2 id="modal-title">{topic}</h2><p>Donation and payment details are still being finalised, so we are not collecting payments on this site yet.</p><div className="modal__address">{ADDRESS}<br/><span>Registration no. {REG_NO}</span></div><p>Email and phone details will be published in the Contact section once confirmed.</p></div></div>
}

export default function App() {
  const [topic, setTopic] = useState<string | null>(null)
  return <><a className="skip-link" href="#home">Skip to content</a><Header onGetInvolved={() => setTopic('Get involved')} /><main><Hero onGetInvolved={() => setTopic('Get involved')} /><About /><OurWork /><Gallery /><GetInvolved onOpen={setTopic} /><Contact /></main><Footer /><Modal topic={topic} onClose={() => setTopic(null)} /></>
}
