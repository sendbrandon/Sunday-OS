'use server';

import { Resend } from 'resend';

export interface SignupResult {
  ok: boolean;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server action: register a congregation member.
 *
 * Storage strategy:
 *   - If RESEND_API_KEY + RESEND_AUDIENCE_ID are set in env, the email
 *     is added to a Resend Audience (a managed mailing list).
 *   - Otherwise, the action gracefully degrades — logs the email and
 *     returns success without persisting. This keeps the UX live
 *     while you set up Resend at deploy time.
 *
 * Daily-scripture send is a follow-up: a Vercel cron at /api/cron/daily
 * fans out to the audience via Resend. Wire when ready (see README).
 */
export async function signup(formData: FormData): Promise<SignupResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, message: 'That doesn’t look like a valid email.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    // graceful local fallback — log only
    console.log(`[sunday-os signup] (no Resend env) ${email}`);
    return {
      ok: true,
      message: 'Welcome to the congregation. (Local mode — set RESEND env vars on Vercel to capture for real.)',
    };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (result.error) {
      // Resend returns a friendly error for duplicate emails — treat as success
      const errMsg = String(result.error.message ?? '').toLowerCase();
      if (errMsg.includes('already') || errMsg.includes('exists')) {
        return { ok: true, message: 'Already in the congregation.' };
      }
      console.error('[sunday-os signup] resend error:', result.error);
      return { ok: false, message: 'Something went wrong. Try again in a moment.' };
    }

    return { ok: true, message: 'Welcome to the congregation.' };
  } catch (err) {
    console.error('[sunday-os signup] exception:', err);
    return { ok: false, message: 'Something went wrong. Try again in a moment.' };
  }
}
