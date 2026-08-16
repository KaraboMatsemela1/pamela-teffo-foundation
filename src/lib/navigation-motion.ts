const INTERNAL_ANCHOR = 'a[href^="#"]'
const REVEAL_SELECTOR = '[data-reveal]'

function revealElements(target: HTMLElement) {
  const elements = Array.from(target.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
  if (target.matches(REVEAL_SELECTOR)) elements.unshift(target)
  return Array.from(new Set(elements))
}

function updateHash(hash: string) {
  if (window.location.hash === hash) return
  window.history.pushState(null, '', hash)
}

export function installNavigationMotion() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => undefined

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let arrivalObserver: IntersectionObserver | null = null
  let cleanupTimer = 0

  const finishArrival = (target: HTMLElement, elements: HTMLElement[]) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        elements.forEach((element) => {
          element.classList.add('is-visible', 'navigation-arrive')
        })
        target.classList.add('navigation-target')
        document.documentElement.classList.remove('is-section-navigating')

        window.clearTimeout(cleanupTimer)
        cleanupTimer = window.setTimeout(() => {
          elements.forEach((element) => element.classList.remove('navigation-arrive'))
          target.classList.remove('navigation-target')
        }, 900)
      })
    })
  }

  const onClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return

    const source = event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>(INTERNAL_ANCHOR)
      : null

    if (!source || source.classList.contains('skip-link') || source.hasAttribute('download') || source.target === '_blank') return

    const hash = source.getAttribute('href')
    if (!hash || hash === '#') return

    let target: HTMLElement | null = null
    try {
      target = document.querySelector<HTMLElement>(hash)
    } catch {
      return
    }
    if (!target) return

    event.preventDefault()
    arrivalObserver?.disconnect()
    arrivalObserver = null

    const elements = revealElements(target)

    if (reducedMotion.matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
      updateHash(hash)
      return
    }

    document.documentElement.classList.add('is-section-navigating')
    elements.forEach((element) => {
      element.classList.remove('is-visible', 'navigation-arrive')
    })
    target.classList.remove('navigation-target')

    arrivalObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      arrivalObserver?.disconnect()
      arrivalObserver = null
      finishArrival(target, elements)
    }, { threshold: .12, rootMargin: '-4% 0px -8% 0px' })

    arrivalObserver.observe(target)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    updateHash(hash)
  }

  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('click', onClick)
    arrivalObserver?.disconnect()
    window.clearTimeout(cleanupTimer)
    document.documentElement.classList.remove('is-section-navigating')
  }
}
