# Pamela Teffo Foundation

Production-quality website for the Pamela Teffo Foundation, a South African community foundation based in Mondeor, Johannesburg.

> Never publish unverified impact statistics, testimonials, contact details, partnerships, financial information or organisational claims.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Semantic HTML
- GitHub Actions
- Cloudflare Pages

## Local setup

```bash
npm ci
npm run dev
```

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
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

## Deployment workflow

```text
feature branch
  ↓
GitHub PR
  ↓
Cloudflare Pages preview
  ↓
Foundation owner review
  ↓
feedback and updates
  ↓
approval
  ↓
merge to main
```

Cloudflare Pages settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Preview deployments: enabled

The repository is intended to remain private while it contains genuine community and learner media. If GitHub Actions cannot run on a private repository because of account billing limits, validate a specific commit while temporarily public only when explicitly approved, then return the repository to private immediately after validation.

## CI

The workflow in `.github/workflows/ci.yml` validates pull requests and pushes with:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

PR #1 commit `1e055342020971852fc37a7737448b03e247df18` was successfully validated with all four checks before the repository was returned to private.

## Content integrity

Verified foundation data lives in `src/data/site.ts`.

Do not add any of the following without evidence and explicit verification:

- beneficiary counts;
- donation totals;
- impact statistics;
- awards or accreditations;
- testimonials;
- staff/founder biographies;
- partnerships or sponsors;
- audited financial claims;
- tax status;
- bank/payment details;
- phone numbers;
- email addresses;
- social media accounts;
- formal programme names.

Where information is unavailable, omit it or structure the code so it can be added later after verification.

## Owner review checklist

Before merging a review build, the foundation owner should confirm:

- organisation name, tagline, registration number and address are correct;
- all visible photographs/videos are approved for website use;
- descriptions of school/learner support accurately reflect the foundation’s work;
- no unverified programme, contact, payment, partnership or impact claims appear;
- mobile and desktop presentation feel appropriate;
- donation/volunteer/partner messaging is acceptable while formal contact/payment channels are pending.
