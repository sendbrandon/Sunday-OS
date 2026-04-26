'use server';

import Stripe from 'stripe';

export interface OfferingResult {
  ok: boolean;
  url?: string;
  message?: string;
}

const MIN_USD = 1;
const MAX_USD = 1000;

/**
 * Creates a Stripe Checkout session for a one-time offering and returns
 * the hosted-Checkout URL. The client redirects to it; user pays on
 * Stripe; Stripe redirects back to /?offering=received on success or
 * /?offering=cancelled on cancel.
 *
 * Without STRIPE_SECRET_KEY set, the action gracefully degrades —
 * returns a mock success so the UX flow still demos locally. Set the
 * env vars on Vercel to flip on real charging.
 */
export async function createOffering(formData: FormData): Promise<OfferingResult> {
  const amountStr = String(formData.get('amount') ?? '');
  const name = String(formData.get('name') ?? '').trim().slice(0, 80);

  const amount = Number(amountStr);
  if (!amount || !Number.isFinite(amount) || amount < MIN_USD || amount > MAX_USD) {
    return {
      ok: false,
      message: `Pick an amount between $${MIN_USD} and $${MAX_USD}.`,
    };
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  if (!apiKey) {
    // graceful local fallback — log and return a mock URL
    console.log(`[sunday-os offering] (no Stripe env) $${amount}${name ? ' from ' + name : ''}`);
    return {
      ok: true,
      url: `${baseUrl}/?offering=received&mock=1`,
    };
  }

  try {
    const stripe = new Stripe(apiKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: 'Sunday · Offering',
              description: 'Keeping Sunday alive — a one-time gift.',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/?offering=received`,
      cancel_url: `${baseUrl}/?offering=cancelled`,
      metadata: {
        name,
        source: 'sunday-os-offering',
      },
    });

    if (!session.url) {
      return { ok: false, message: 'Stripe did not return a checkout URL. Try again.' };
    }

    return { ok: true, url: session.url };
  } catch (err) {
    console.error('[sunday-os offering] stripe error:', err);
    return { ok: false, message: 'Something went wrong. Try again in a moment.' };
  }
}
