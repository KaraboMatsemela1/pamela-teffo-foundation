# Pamela Teffo Foundation

Production website for the **Pamela Teffo Foundation**, a Johannesburg-based community foundation with the tagline **“Our pride is our people.”**

This repository is a clean rebuild. It does not depend on the previous Lovable implementation.

## Content integrity

This project is intentionally strict about factual claims. Real supplied foundation media is used throughout the site. No AI-generated beneficiary imagery is used.

> Never publish unverified impact statistics, testimonials, contact details, partnerships, financial information or organisational claims.

If information is not verified, omit it or present a clearly labelled “awaiting verified information” state.

## Verified organisation details currently used

- **Name:** Pamela Teffo Foundation
- **Tagline:** Our pride is our people.
- **Registration:** 2025 / 683667 / 08
- **Location:** Unit 27 Lake Mondeor, 49 John Masefield Drive, Mondeor, Johannesburg, South Africa

Phone, email, social URLs, donation details, tax status, banking details, impact metrics, sponsor claims and partner claims are intentionally absent until verified.

## Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Semantic HTML and custom CSS
- GitHub Actions
- Cloudflare Pages-ready static deployment

There is no backend because the current requirements do not justify one.

## Local setup

```bash
npm ci
npm run dev
```

Open the local Vite URL shown in your terminal.

## Available commands

```bash
npm run dev          # local development
npm run lint         # ESLint
npm run typecheck    # TypeScript checks
npm run build        # production build
npm run preview      # preview the production build
npm run format       # run Prettier
npm run format:check # verify formatting
```

## Project structure

```text
public/
  media/             # optimised, genuine supplied photos and selected footage
src/
  components/
    layout/
    sections/
    ui/
  data/              # verified organisation data
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

This prevents an unapproved preview URL from being treated as the permanent canonical domain.

## Cloudflare Pages preview workflow

Recommended workflow:

```text
feature branch
  → GitHub PR
  → Cloudflare Pages preview deployment
  → owner review
  → feedback and updates
  → approval
  → merge to main
```

Suggested Cloudflare Pages settings:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: **22**
- Production branch: `main`
- Preview deployments: enabled for non-production branches / pull requests
- Custom domain: do not attach until owner approval

`public/_redirects` includes an SPA fallback so section navigation and future client-side routes remain deployable on Pages.

## CI

`.github/workflows/ci.yml` validates pushes and PRs with:

```text
npm ci
npm run lint
npm run typecheck
npm run build
```

The first feature-branch run bootstraps and commits `package-lock.json` if this repository was created from an environment without npm registry access. Subsequent runs use `npm ci` exclusively.

## Production deployment

1. Obtain owner approval on the Cloudflare preview.
2. Verify final legal/contact/payment information separately.
3. Ensure CI is green.
4. Merge the approved PR to `main`.
5. Let Cloudflare Pages deploy `main`.
6. Perform a final desktop/mobile/accessibility smoke test.
7. Attach the approved custom domain only when the foundation owner is ready.

## Privacy and dignity

The website contains photographs of real people, including learners. Treat these assets as sensitive community media. Do not reuse them outside the foundation project, and remove any image promptly if the foundation requests it.
