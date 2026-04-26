# Sunday-OS

A church for secular memory. Curated DJ mixtapes, archival video, and a daily scripture ritual — delivered through a 1995-PowerPoint-meets-Donda operating system.

## Stack

- Next.js 14 (App Router)
- React 18, TypeScript
- Plain CSS (no Tailwind — the design is too disciplined for utility classes)
- Mixcloud iframe embeds (no audio hosted)

## Locked design system

- **One color**: Pantone 14-4318 "Blue Atoll" `#00B7C3`
- **One typeface**: Times New Roman (caps for display, italic for body, roman for technical)
- **Brutal rigor**: zero shadows, zero gradients, hard edges only
- **Five sacraments**: Player · Mixtapes · Daily Bread · Testimony · Guestbook

References: Jesus Is King · Donda · Sunday Service merch.

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy

Vercel auto-deploys on push to `main`. Custom domain TBD.
