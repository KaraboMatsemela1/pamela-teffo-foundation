# Pamela Teffo Foundation

React + Vite + TypeScript + Tailwind implementation for the Pamela Teffo Foundation website.

## Content integrity rule

Never publish unverified impact statistics, testimonials, contact details, partnerships, financial information or organisational claims.

## Verified organisational information

The current website content is grounded in supplied foundation material and genuine foundation media. The supplied foundation profile confirms:

- Pamela Teffo Foundation is described as a registered South African non-profit organisation.
- Registration number: `2025 / 683667 / 08`.
- Address: Unit 27 Lake Mondeor, 49 John Masefield Drive, Mondeor, Johannesburg, South Africa.
- Phone as printed in the supplied profile: `+27 68 366 708`.
- Email as printed in the supplied profile: `info@pamelatefffoundation.org.za`.
- Facebook page name as printed: `Pamela TEFFO Foundation`.
- Vision, mission and the current-needs list on the website are taken from the supplied foundation profile.

Do not silently correct or infer alternative contact details. If updated official information is provided, update `src/data/site.ts` and the structured metadata together.

## Current media policy

- Use only genuine supplied foundation photographs for beneficiaries/community work.
- Do not use AI-generated beneficiaries or stock community imagery.
- The review site intentionally contains no outreach video.
- The gallery uses five genuine outreach photographs, served as Vite-managed hashed assets.

## Development

```bash
npm ci
npm run dev
```

Validation:

```bash
npm run lint
npm run typecheck
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Review branch: `feature/foundation-rebuild`
- Production branch after owner approval: `main`

No custom production domain should be attached until owner approval and merge to `main`.
