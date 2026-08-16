import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { site } from './data/site'

const dialogFocusable = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 18h18M2 6l10-4 10 4v2H2V6Z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export default function DonationPortal() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const interceptDonationCard = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const button = target?.closest<HTMLButtonElement>('.involved-grid li button')
      if (!button) return

      const card = button.closest('li')
      const title = card?.querySelector('h3')?.textContent?.trim()
      if (title !== 'Donate essentials') return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      setOpen(true)
    }

    document.addEventListener('click', interceptDonationCard, true)
    return () => document.removeEventListener('click', interceptDonationCard, true)
  }, [])

  useEffect(() => {
    if (!open) return

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button')?.focus(), 0)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(dialogFocusable) ?? [])
      if (!elements.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
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
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus.current?.focus()
    }
  }, [open])

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(site.donation.accountNumber)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = site.donation.accountNumber
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  if (!open) return null

  return createPortal(
    <div className="donation-modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false)
    }}>
      <div className="donation-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="donation-dialog-title">
        <button type="button" className="donation-dialog__close" onClick={() => setOpen(false)} aria-label="Close donation options">
          <CloseIcon />
        </button>

        <div className="donation-dialog__heading">
          <p className="eyebrow">Support the foundation</p>
          <h2 id="donation-dialog-title">Ways to donate</h2>
          <p>Choose the option that works best for you. Contact the foundation if you need help arranging a contribution.</p>
        </div>

        <div className="donation-options">
          <section className="donation-option donation-option--essentials" aria-labelledby="donate-essentials-title">
            <span className="donation-option__label">Essential items</span>
            <h3 id="donate-essentials-title">Donate essentials</h3>
            <p>Current priority items include:</p>
            <ul className="donation-needs">
              {site.currentNeeds.map((need) => <li key={need.title}>{need.title}</li>)}
            </ul>
            <div className="donation-contact-actions">
              <a href={`tel:${site.phone.href}`}>Call {site.phone.display}</a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent('Donate essentials enquiry')}`}>Email to arrange</a>
            </div>
          </section>

          <section className="donation-option donation-option--bank" aria-labelledby="bank-transfer-title">
            <div className="donation-option__bank-heading">
              <BankIcon />
              <span className="donation-option__label">Bank transfer</span>
            </div>
            <h3 id="bank-transfer-title">Make a financial contribution</h3>
            <dl className="donation-details">
              <div><dt>Bank</dt><dd>{site.donation.bank}</dd></div>
              <div><dt>Account holder</dt><dd>{site.donation.accountHolder}</dd></div>
              <div className="donation-details__account">
                <dt>Account number</dt>
                <dd>
                  <span>{site.donation.accountNumber}</span>
                  <button type="button" className="copy-account-button" onClick={copyAccountNumber}>
                    <CopyIcon /> {copied ? 'Copied' : 'Copy'}
                  </button>
                </dd>
              </div>
            </dl>
            <p className="donation-minimum">Contributions from <strong>{site.donation.minimumContribution}</strong> are welcome.</p>
            <p className="copy-status" role="status" aria-live="polite">{copied ? 'Account number copied to clipboard.' : ''}</p>
          </section>
        </div>
      </div>
    </div>,
    document.body,
  )
}
