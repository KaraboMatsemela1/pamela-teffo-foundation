const SECTION_SELECTOR = 'section[id]'
const NAV_LINK_SELECTOR = 'a[href^="#"]:not(.skip-link)'

let animationFrame = 0
let arrivalTimer = 0
let activeTarget: HTMLElement | null = null
let scrollTicking = false

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function headerOffset(): number {
  const header = document.querySelector<HTMLElement>('.site-header')
  return (header?.offsetHeight ?? 0) + 12
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function setCurrentLink(hash: string) {
  document.querySelectorAll<HTMLAnchorElement>(NAV_LINK_SELECTOR).forEach((link) => {
    const current = link.getAttribute('href') === hash
    link.classList.toggle('is-current', current)
    if (current) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  })
}

function pulseLink(hash: string) {
  if (prefersReducedMotion()) return
  document.querySelectorAll<HTMLAnchorElement>(NAV_LINK_SELECTOR).forEach((link) => {
    link.classList.remove('nav-link-pulse')
    if (link.getAttribute('href') === hash) {
      void link.offsetWidth
      link.classList.add('nav-link-pulse')
      window.setTimeout(() => link.classList.remove('nav-link-pulse'), 560)
    }
  })
}

function showArrival(target: HTMLElement) {
  window.clearTimeout(arrivalTimer)
  activeTarget?.classList.remove('nav-arrival')
  activeTarget = target

  if (prefersReducedMotion()) return

  target.classList.remove('nav-arrival')
  void target.offsetWidth
  target.classList.add('nav-arrival')
  arrivalTimer = window.setTimeout(() => {
    target.classList.remove('nav-arrival')
    if (activeTarget === target) activeTarget = null
  }, 1100)
}

function finishNavigation(target: HTMLElement, hash: string) {
  document.documentElement.classList.remove('nav-is-moving')
  setCurrentLink(hash)
  pulseLink(hash)
  showArrival(target)
}

function cancelNavigation() {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }
  document.documentElement.classList.remove('nav-is-moving')
}

function animateTo(target: HTMLElement, hash: string) {
  cancelNavigation()

  const startY = window.scrollY
  const targetY = Math.max(0, target.getBoundingClientRect().top + startY - headerOffset())
  const distance = Math.abs(targetY - startY)

  if (prefersReducedMotion() || distance < 8) {
    window.scrollTo(0, targetY)
    finishNavigation(target, hash)
    return
  }

  const duration = Math.min(1250, Math.max(720, 720 + distance * 0.12))
  const startedAt = performance.now()
  document.documentElement.classList.add('nav-is-moving')

  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    const eased = easeInOutCubic(progress)
    window.scrollTo(0, startY + (targetY - startY) * eased)

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(step)
      return
    }

    animationFrame = 0
    window.scrollTo(0, targetY)
    finishNavigation(target, hash)
  }

  animationFrame = window.requestAnimationFrame(step)
}

function updateCurrentFromScroll() {
  scrollTicking = false
  if (animationFrame) return

  const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR))
  if (!sections.length) return

  const marker = headerOffset() + window.innerHeight * 0.2
  let current = sections[0]

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) current = section
    else break
  }

  setCurrentLink(`#${current.id}`)
}

function scheduleCurrentFromScroll() {
  if (scrollTicking) return
  scrollTicking = true
  window.requestAnimationFrame(updateCurrentFromScroll)
}

export function setupNavigationMotion(): () => void {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(NAV_LINK_SELECTOR)
    if (!link) return

    const hash = link.getAttribute('href')
    if (!hash || hash === '#') return

    const target = document.querySelector<HTMLElement>(hash)
    if (!target) return

    event.preventDefault()
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)

    window.requestAnimationFrame(() => animateTo(target, hash))
  }

  const onUserInterrupt = () => cancelNavigation()
  const onKeyDown = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelNavigation()
  }
  const onPopState = () => {
    const hash = window.location.hash || '#home'
    const target = document.querySelector<HTMLElement>(hash)
    if (target) window.requestAnimationFrame(() => animateTo(target, hash))
  }

  document.addEventListener('click', onClick)
  window.addEventListener('scroll', scheduleCurrentFromScroll, { passive: true })
  window.addEventListener('wheel', onUserInterrupt, { passive: true })
  window.addEventListener('touchstart', onUserInterrupt, { passive: true })
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('popstate', onPopState)
  window.requestAnimationFrame(updateCurrentFromScroll)

  return () => {
    cancelNavigation()
    window.clearTimeout(arrivalTimer)
    document.removeEventListener('click', onClick)
    window.removeEventListener('scroll', scheduleCurrentFromScroll)
    window.removeEventListener('wheel', onUserInterrupt)
    window.removeEventListener('touchstart', onUserInterrupt)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('popstate', onPopState)
  }
}
