import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { site } from './data/site'

function BankIcon() {
  return (
    <svg className="donation-bank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

export default function DonationPortal() {
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact?.parentElement) return

    let section = document.getElementById('donate')
    let created = false

    if (!section) {
      section = document.createElement('section')
      section.id = 'donate'
      section.className = 'donation-section section-border'
      contact.parentElement.insertBefore(section, contact)
      created = true
    }

    setHost(section)
    return () => {
      if (created) section?.remove()
    }
  }, [])

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

  if (!host) return null

  return createPortal(
    <div className="shell section-pad donation-shell">
      <div className="donation-heading">
        <p className="eyebrow eyebrow--gold">Donate</p>
        <h2>Every contribution can make a difference.</h2>
        <p>
          Financial contributions help the foundation respond to practical needs and continue its community outreach.
          Contributions from {site.donation.minimumContribution} are welcome.
        </p>
      </div>

      <article className="donation-card" aria-labelledby="banking-details-heading">
        <div className="donation-card__title">
          <BankIcon />
          <h3 id="banking-details-heading">Banking details</h3>
        </div>
        <dl className="donation-details">
          <div>
            <dt>Bank</dt>
            <dd>{site.donation.bank}</dd>
          </div>
          <div>
            <dt>Account holder</dt>
            <dd>{site.donation.accountHolder}</dd>
          </div>
          <div>
            <dt>Account number</dt>
            <dd>
              <span className="donation-account-number">{site.donation.accountNumber}</span>
              <button type="button" className="copy-account-button" onClick={copyAccountNumber} aria-label="Copy donation account number">
                <CopyIcon />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </dd>
          </div>
        </dl>
        <p className="copy-status" role="status" aria-live="polite">{copied ? 'Account number copied to clipboard.' : ''}</p>
      </article>

      <p className="donation-note">
        Thank you for supporting the Pamela Teffo Foundation and the communities it serves.
      </p>
    </div>,
    host,
  )
}
