import { rm, writeFile } from 'node:fs/promises'

const siteUrl = process.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
const sitemapPath = new URL('../public/sitemap.xml', import.meta.url)
const robotsPath = new URL('../public/robots.txt', import.meta.url)

if (!siteUrl) {
  await rm(sitemapPath, { force: true })
  await writeFile(robotsPath, 'User-agent: *\nAllow: /\n\n# Sitemap will be added when a production URL is approved.\n')
  console.log('Skipping sitemap: VITE_SITE_URL is not set.')
  process.exit(0)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`

await writeFile(sitemapPath, sitemap)
await writeFile(robotsPath, `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated sitemap for ${siteUrl}`)
