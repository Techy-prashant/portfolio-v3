import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, honeypot } = body;

    // Spam protection: honeypot
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // Send email notification
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "pt286355@gmail.com";

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [toEmail],
          subject: `New message from ${name} — Portfolio`,
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h2 style="color:#1c1917;">New Portfolio Contact</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <hr style="border:none;border-top:1px solid #e7e5e4;margin:16px 0;"/>
              <p style="color:#57534e; white-space: pre-wrap;">${message}</p>
            </div>
          `,
          reply_to: email,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
      }
    } else {
      // Fallback: log to console (dev mode)
      console.log("📬 Contact form submission:", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
