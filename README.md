# Sunday-OS

A church for secular memory. Curated DJ mixtapes, archival video, and a daily scripture ritual — delivered through a 1995-PowerPoint-meets-Donda operating system.

## Stack

- Next.js 14 (App Router)
- React 18, TypeScript
- Plain CSS (no Tailwind — the design is too disciplined for utility classes)
- Mixcloud iframe embeds for audio (no audio hosted)
- Resend for email signup (graceful fallback if no API key)

## Locked design system

- **One color**: Pantone 14-4318 "Blue Atoll" `#00B7C3`
- **One typeface**: Times New Roman (caps for display, italic for body, roman for technical)
- **Brutal rigor**: zero shadows, zero gradients, hard edges only
- **Three sacraments**: Player · Mixtapes · Daily Bread

References: Jesus Is King · Donda · Sunday Service merch.

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Email signup — wire-up on Vercel

The "Join the congregation" form uses [Resend](https://resend.com) for email capture. **Without env vars, the form gracefully degrades** — it returns success but logs the email to console only (useful for local dev).

To turn on real capture:

1. Sign up at [resend.com](https://resend.com) (free tier: 3K emails/month, 100/day)
2. Create an Audience in the Resend dashboard. Copy its ID.
3. In Vercel project settings → Environment Variables, add:
   - `RESEND_API_KEY` — your Resend API key
   - `RESEND_AUDIENCE_ID` — the Audience ID from step 2
4. Redeploy. Form is now live.

## Daily scripture cron (v1.1)

Once Resend is wired, the daily scripture send is a Vercel cron job that picks a verse and broadcasts to the audience. To wire:

1. Create `app/api/cron/daily/route.ts` that calls `resend.broadcasts.create()`
2. Add to `vercel.json`:
   ```json
   { "crons": [{ "path": "/api/cron/daily", "schedule": "0 13 * * *" }] }
   ```
   (13:00 UTC ≈ sunrise EST)
3. Deploy.

## Deploy

Vercel auto-deploys on push to `main`. Custom domain TBD.
