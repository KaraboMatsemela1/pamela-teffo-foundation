# Pamela Teffo Foundation

Official website rebuild for the Pamela Teffo Foundation, a South African community foundation based in Mondeor, Johannesburg.

> Never publish unverified impact statistics, testimonials, contact details, partnerships, financial information or organisational claims.

This project deliberately prioritises authenticity, dignity, accessibility and factual integrity. Genuine foundation media is used as the visual source of truth; AI-generated beneficiary imagery is not permitted.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Semantic HTML
- GitHub Actions
- Cloudflare Pages-ready deployment

## Local setup

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Project structure

```text
src/
  assets/
    images/
    video/
  components/
    layout/
    navigation/
    sections/
    ui/
  data/
  hooks/
  lib/
  pages/
  styles/
```

## Asset management

Only use media supplied or explicitly approved by the foundation.

Before committing large media:

1. keep the original archived outside the production bundle;
2. resize photographs to the maximum display size required;
3. prefer WebP/AVIF for photographs where practical;
4. preserve natural colour and documentary character;
5. do not retouch people in a way that makes them appear artificial;
6. provide meaningful alt text;
7. re-encode video for web delivery and avoid autoplay.

The current site uses one short, muted, re-encoded learner-support clip to protect performance and avoid publishing incidental audio.

## Adding verified contact information

Update `src/data/site.ts` only after the foundation has confirmed the details. Keep email, phone, social media and donation/payment data out of the UI until verified.

## Adding future work/programmes

Do not turn an activity into a formal “programme” unless the foundation confirms that it is one. Add content to the relevant section only when the description, name and supporting evidence are verified.

## SEO

Base metadata is provided in `index.html`. A canonical URL is inserted only when `VITE_SITE_URL` is supplied.

Example:

```bash
VITE_SITE_URL=https://example.org npm run build
```

## Git workflow

Development work should happen on feature branches and be merged through pull requests only after CI passes and the review preview is approved.

Current rebuild branch:

```text
feature/foundation-rebuild
```

## Cloudflare Pages

The project is prepared for Cloudflare Pages.

Recommended configuration:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Production branch: main
```

Preview deployments should be enabled for pull requests and feature branches. The production domain must not be attached until the foundation owner approves the review deployment.

## Content integrity

The website must never invent or imply:

- beneficiary counts;
- donation totals;
- impact metrics;
- founding dates;
- awards;
- sponsors or partnerships;
- audited reports;
- tax status;
- testimonials;
- bank details;
- phone numbers;
- email addresses;
- social media accounts;
- formal programmes not verified by the foundation.

When verified information is unavailable, omit it or keep the relevant data field unset until it is confirmed.

## Current verified identity information

- Pamela Teffo Foundation
- Tagline: Our pride is our people.
- Registration number: 2025 / 683667 / 08
- Unit 27 Lake Mondeor, 49 John Masefield Drive, Mondeor, Johannesburg, South Africa

## Owner review checklist

Before merging the first release, review the Cloudflare Pages preview on both mobile and desktop and confirm:

- all visible people imagery comes from approved genuine foundation media;
- names, registration number and physical address are correct;
- no unverified phone, email, banking, social, partnership, testimonial or impact claims are visible;
- hero crop and mobile image crops are respectful and readable;
- video content is appropriate for public publication;
- Get Involved wording accurately reflects how the foundation wants prospective supporters to engage;
- the site is approved for public release.

Only after the preview is approved should the PR be merged to `main` and a production domain be attached.