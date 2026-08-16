# Pamela Teffo Foundation

Official website rebuild for the Pamela Teffo Foundation.

## Content integrity

Never publish unverified impact statistics, testimonials, contact details, partnerships, financial information or organisational claims.

## Development

- React
- Vite
- TypeScript
- Tailwind CSS
- Cloudflare Pages

### Commands

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Production branch after owner approval: `main`
- Review branch before merge: `feature/foundation-rebuild`

The review deployment is available at `https://pamela-teffo-foundation.pages.dev/` while owner review is in progress.

### Media policy

Use only genuine foundation-provided media. Do not generate or substitute AI-created beneficiaries or community members. Do not publish names, contact information or other personal details unless specifically verified and approved.

The review site currently uses an image-only Gallery. All six supplied image assets are presented in a horizontal, swipeable carousel with lightbox navigation; outreach video has intentionally been removed.

### Current review note

The first image-carousel commit contained a corrupted `src/App.tsx` blob and was rejected by both CI and Cloudflare. The source was rebuilt from the last known-good deployment and repaired in commit `b25cdc0` while preserving the six-image carousel behavior.
