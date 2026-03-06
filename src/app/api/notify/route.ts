import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { email, honeypot } = await req.json();

    // Spam protection: honeypot
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const token = uuidv4();

    // Check if already subscribed (skip for now)
    // Send verification email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/notify/verify/${token}`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: "Prashant Tiwari <onboarding@resend.dev>",
          to: [email],
          subject: "Verify your email subscription",
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h2>Welcome to my newsletter!</h2>
              <p>Please verify your email by clicking the link below:</p>
              <a href="${verifyUrl}" style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Verify Email</a>
              <p>If you didn't subscribe, you can ignore this email.</p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Verification email sent" });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
