export const site = {
  name: 'Pamela Teffo Foundation',
  tagline: 'Our pride is our people.',
  organisationType: 'Registered South African non-profit organisation',
  registrationNumber: '2025 / 683667 / 08',
  address: {
    line1: 'Unit 27 Lake Mondeor',
    line2: '49 John Masefield Drive',
    suburb: 'Mondeor',
    city: 'Johannesburg',
    country: 'South Africa',
  },
  phone: {
    display: '+27 68 366 708',
    href: '+2768366708',
  },
  email: 'info@pamelatefffoundation.org.za',
  facebookName: 'Pamela TEFFO Foundation',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61587660965151',
  profileSummary:
    'Pamela Teffo Foundation is a South African non-profit organisation committed to building a better society by uplifting the lives of vulnerable individuals and communities.',
  about:
    'Pamela Teffo Foundation is a registered non-profit organisation based in South Africa. We focus on providing support to underprivileged children, families and communities through donations, outreach programmes and development initiatives.',
  belief:
    'We believe that by coming together and sharing our resources, we can create lasting change and build a brighter future for all.',
  vision:
    'To create empowered communities where everyone has the opportunity to thrive.',
  mission:
    'To provide assistance, resources and hope to those in need through compassion, dignity and respect.',
  currentNeeds: [
    {
      title: 'School shoes',
      description: 'To help learners attend school with dignity and confidence.',
    },
    {
      title: 'Clean wearable clothing',
      description: 'Clean and wearable clothing for children and families in need.',
    },
    {
      title: 'Canned food',
      description: 'Non-perishable food items to support vulnerable households.',
    },
    {
      title: 'Basketballs',
      description: 'To promote sports development and healthy lifestyles among young people.',
    },
  ],
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
