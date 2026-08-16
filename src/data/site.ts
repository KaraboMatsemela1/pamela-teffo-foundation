export const site = {
  name: 'Pamela Teffo Foundation',
  tagline: 'Our pride is our people.',
  registrationNumber: '2025 / 683667 / 08',
  address: {
    line1: 'Unit 27 Lake Mondeor',
    line2: '49 John Masefield Drive',
    suburb: 'Mondeor',
    city: 'Johannesburg',
    country: 'South Africa',
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Unit+27+Lake+Mondeor%2C+49+John+Masefield+Drive%2C+Mondeor%2C+Johannesburg%2C+South+Africa',
  siteUrl: import.meta.env.VITE_SITE_URL?.trim() || null,
} as const

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Get Involved', href: '#get-involved' },
  { label: 'Contact', href: '#contact' },
] as const
