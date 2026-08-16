import { readFile, writeFile } from 'node:fs/promises'

const appPath = new URL('../src/App.tsx', import.meta.url)
const brandingEntry = "  { src: '/media/foundation-branding.webp', alt: 'Pamela Teffo Foundation branding artwork supplied by the organisation', caption: 'Foundation branding artwork supplied with the original media.' },\n"

const source = await readFile(appPath, 'utf8')

if (source.includes(brandingEntry)) {
  await writeFile(appPath, source.replace(brandingEntry, ''), 'utf8')
  console.log('Removed branding artwork from gallery build.')
} else {
  console.log('Branding artwork is already absent from gallery source.')
}
