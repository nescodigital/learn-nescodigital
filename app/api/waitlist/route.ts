import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nume, interes, sursa } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email invalid." }, { status: 400 });
    }

    const { error } = await supabase.from("waitlist_cursuri").insert({
      email: email.trim().toLowerCase(),
      nume: nume?.trim() || null,
      interes: interes || null,
      sursa: sursa || "direct",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Ești deja pe listă!" },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "A apărut o eroare. Încearcă din nou." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist POST error:", err);
    return NextResponse.json(
      { error: "A apărut o eroare. Încearcă din nou." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, rol, industrie, nivel_ai, obiectiv } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email invalid." }, { status: 400 });
    }

    const { error } = await supabase
      .from("waitlist_cursuri")
      .update({
        rol: rol || null,
        industrie: industrie || null,
        nivel_ai: nivel_ai || null,
        obiectiv: obiectiv || null,
      })
      .eq("email", email.trim().toLowerCase());

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "A apărut o eroare. Încearcă din nou." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist PATCH error:", err);
    return NextResponse.json(
      { error: "A apărut o eroare. Încearcă din nou." },
      { status: 500 }
    );
  }
}
