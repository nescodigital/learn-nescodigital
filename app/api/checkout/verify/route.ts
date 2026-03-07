import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ valid: false });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const valid = session.status === "complete" || session.payment_status === "paid" || session.status === "open";
    return NextResponse.json({ valid });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
