import { useEffect, useRef, useState } from 'react'
import { navigation, site } from '../../data/site'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { Container } from '../ui/Container'

export function Header() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  useBodyScrollLock(open)

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="brand" href="#home" aria-label={`${site.name} home`} onClick={closeMenu}>
          <span className="brand__name">Pamela Teffo</span>
          <span className="brand__type">Foundation</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button--small header-cta" href="#get-involved">
          Get Involved
        </a>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </Container>

      {open ? (
        <div className="mobile-nav mobile-nav--open" id="mobile-navigation">
          <Container>
            <nav aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a className="button button--primary mobile-nav__cta" href="#get-involved" onClick={closeMenu}>
              Get Involved
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
