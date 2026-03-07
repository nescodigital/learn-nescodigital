import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Trial ends 15 May 2026 — first charge happens at launch
const TRIAL_END = Math.floor(new Date("2026-05-15T00:00:00Z").getTime() / 1000);

// Price IDs fixe din Stripe Dashboard (nu se mai creează la fiecare request)
// RON — 197/297 RON / 28 zile
// EUR — 49/79 EUR / 28 zile (pentru versiunea EN)
const PRICE_IDS: Record<string, Record<string, string>> = {
  ron: {
    starter: process.env.STRIPE_PRICE_RON_STARTER!,
    pro: process.env.STRIPE_PRICE_RON_PRO!,
  },
  eur: {
    starter: process.env.STRIPE_PRICE_EUR_STARTER!,
    pro: process.env.STRIPE_PRICE_EUR_PRO!,
  },
};

const VALID_PLANS = ["starter", "pro"];
const VALID_CURRENCIES = ["ron", "eur"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, currency = "ron" } = body;

    if (!plan || !VALID_PLANS.includes(plan)) {
      return NextResponse.json({ error: "Plan invalid." }, { status: 400 });
    }

    const curr = VALID_CURRENCIES.includes(currency) ? currency : "ron";
    const priceId = PRICE_IDS[curr]?.[plan];

    if (!priceId) {
      console.error(`Missing price ID for ${curr}/${plan}`);
      return NextResponse.json({ error: "Configurație lipsă. Contactează suportul." }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://edu-ai.ro";
    const locale = curr === "eur" ? "en" : "ro";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_end: TRIAL_END,
        metadata: {
          cohort: "presale-2026",
          plan,
          currency: curr,
        },
      },
      success_url: `${baseUrl}/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email ?? "")}`,
      cancel_url: `${baseUrl}/`,
      locale,
      custom_text: {
        submit: {
          message: curr === "eur"
            ? "You won't be charged now. First payment at launch (max May 15, 2026). Cancel anytime before."
            : "Nu ești taxat acum. Prima plată se face la lansare (max 15 mai 2026). Poți anula oricând înainte.",
        },
      },
      metadata: {
        email: email ?? "",
        plan,
        currency: curr,
        cohort: "presale-2026",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "A apărut o eroare. Încearcă din nou." }, { status: 500 });
  }
}
