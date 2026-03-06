import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Trial ends 15 May 2026 — first charge happens at launch
const TRIAL_END = Math.floor(new Date("2026-05-15T00:00:00Z").getTime() / 1000);

// 28-day billing cycle = 13 cycles/year
const BILLING_CYCLE_ANCHOR_BEHAVIOR = "phase_start";

const PLANS = {
  starter: {
    name: "Edu-AI Starter — Presale",
    amount: 19700, // 197 RON in bani
    currency: "ron",
    interval_count: 28,
  },
  pro: {
    name: "Edu-AI Pro — Presale",
    amount: 29700, // 297 RON in bani
    currency: "ron",
    interval_count: 28,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email } = body;

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: "Plan invalid." }, { status: 400 });
    }

    const planData = PLANS[plan as keyof typeof PLANS];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://edu-ai.ro";

    // Create a price for 28-day recurring billing
    const price = await stripe.prices.create({
      currency: planData.currency,
      unit_amount: planData.amount,
      recurring: {
        interval: "day",
        interval_count: planData.interval_count,
      },
      product_data: {
        name: planData.name,
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [{ price: price.id, quantity: 1 }],
      subscription_data: {
        trial_end: TRIAL_END,
        metadata: {
          cohort: "presale-2026",
          plan,
        },
      },
      success_url: `${baseUrl}/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      locale: "ro",
      custom_text: {
        submit: {
          message: "Nu ești taxat acum. Prima plată se face la lansare (max 15 mai 2026). Poți anula oricând înainte.",
        },
      },
      metadata: {
        email: email ?? "",
        plan,
        cohort: "presale-2026",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "A aparut o eroare. Incearca din nou." }, { status: 500 });
  }
}
