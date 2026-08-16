import { site } from '../data/site'

export function applyRuntimeSeo(): void {
  if (!site.siteUrl) return

  const canonicalUrl = new URL('/', site.siteUrl).toString()
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }

  canonical.href = canonicalUrl
}
