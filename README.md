# Sunday OS

Live demo: [sunday-os.vercel.app](https://sunday-os.vercel.app)

Sunday OS is a media archive and ritual interface for secular memory. It combines curated DJ mixtapes, archival video, daily text, signup patterns, and donation-flow scaffolding inside a deliberately strict visual system.

## Portfolio Signal

This project shows my ability to use AI-assisted development for a complete product atmosphere, not just a screen. The work includes information architecture, interaction design, copy direction, service integration planning, and graceful fallback behavior so the demo still works without production credentials.

## What I Built

- Next.js App Router interface with draggable, desktop-like media modules
- Mixcloud embeds for audio without hosting copyrighted audio files
- Resend-ready email signup flow with local fallback behavior
- Stripe-ready offering flow with success and cancel states
- Curated data modules for reels, mixtapes, and daily text
- Locked visual system: one color, one type family, hard edges, no decorative blur

## Stack

- Next.js 14
- React 18
- TypeScript
- Plain CSS
- Resend
- Stripe

## Local Dev

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Email Signup

The signup form uses Resend when credentials are available. Without env vars, the form returns success and logs locally so the demo remains testable.

```bash
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
```

## Offering Flow

The offering flow is Stripe-ready. Without `STRIPE_SECRET_KEY`, it routes through the demo success state so the user journey remains visible.

```bash
STRIPE_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=https://sunday-os.vercel.app
```

## Deploy

Vercel auto-deploys on push to `main`.
