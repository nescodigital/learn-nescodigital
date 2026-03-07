import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function waitlistEmailHtml(nume: string | null): string {
  const prenume = nume ? `, ${nume}` : "";
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ești pe lista Edu-AI!</title>
</head>
<body style="margin:0;padding:0;background:#0d0d12;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d12;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="https://edu-ai.ro/logo.png" alt="Edu-AI" height="32" style="display:block;" />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#13131a;border:1px solid #2a2a3e;border-radius:16px;padding:40px 36px;">

              <!-- Badge -->
              <p style="margin:0 0 20px;text-align:center;">
                <span style="display:inline-block;background:rgba(108,99,255,0.12);border:1px solid rgba(108,99,255,0.3);border-radius:100px;padding:5px 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a78bfa;">
                  Lista de așteptare
                </span>
              </p>

              <!-- Heading -->
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;text-align:center;color:#ffffff;">
                Ești pe listă${prenume}! 🎉
              </h1>

              <!-- Subtext -->
              <p style="margin:0 0 32px;font-size:15px;color:#8888a8;line-height:1.7;text-align:center;">
                Ai rezervat accesul cu preț special de lansare.<br />
                Te anunțăm primii când deschidem porțile.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:#1f1f2e;margin-bottom:28px;"></div>

              <!-- What happens next -->
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555570;">
                Ce urmează
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;vertical-align:top;width:32px;font-size:18px;">🔒</td>
                  <td style="padding:10px 0 10px 8px;font-size:14px;color:#b0b0c8;line-height:1.6;">
                    <strong style="color:#fff;">Prețul tău e blocat.</strong> Indiferent când lansăm, tu plătești prețul de pe waitlist — garantat.
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;width:32px;font-size:18px;">📣</td>
                  <td style="padding:10px 0 10px 8px;font-size:14px;color:#b0b0c8;line-height:1.6;">
                    <strong style="color:#fff;">Ești primul care știe.</strong> Abonații de pe waitlist primesc accesul cu 48h înainte de lansarea publică.
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;width:32px;font-size:18px;">🚀</td>
                  <td style="padding:10px 0 10px 8px;font-size:14px;color:#b0b0c8;line-height:1.6;">
                    <strong style="color:#fff;">Lansăm în curând.</strong> Pregătim ultimele cursuri și testăm platforma. Câteva săptămâni și ești înăuntru.
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:#1f1f2e;margin:28px 0;"></div>

              <!-- CTA Button -->
              <p style="margin:0;text-align:center;">
                <a href="https://edu-ai.ro" style="display:inline-block;background:linear-gradient(135deg,#6c63ff,#a78bfa);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:10px;letter-spacing:-0.2px;">
                  Vizitează edu-ai.ro →
                </a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#444460;line-height:1.6;">
                Ai primit acest email pentru că te-ai înscris pe lista de așteptare Edu-AI.
              </p>
              <p style="margin:0;font-size:12px;color:#444460;">
                Întrebări? Scrie-ne la
                <a href="mailto:hello@edu-ai.ro" style="color:#6c63ff;text-decoration:none;"> hello@edu-ai.ro</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

    // Trimite email de confirmare (fire & forget — nu blocăm răspunsul)
    resend.emails.send({
      from: "Edu-AI <no-reply@edu-ai.ro>",
      to: email.trim().toLowerCase(),
      subject: "Ești pe lista Edu-AI 🎉 — prețul tău e blocat",
      html: waitlistEmailHtml(nume?.trim() || null),
    }).catch((err) => console.error("Resend error:", err));

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
