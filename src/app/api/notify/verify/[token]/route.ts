import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const { token } = params;

    // For now, just acknowledge the verification attempt
    return new Response(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>✅ Email Verified!</h1>
          <p>Thank you for subscribing to my newsletter.</p>
          <p>You'll receive updates about my latest projects and thoughts.</p>
          <p><small>Note: Database integration is currently disabled.</small></p>
        </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });

  } catch (error) {
    console.error("Verification error:", error);
    return new Response(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>Something went wrong. Please try again later.</p>
        </body>
      </html>
    `, { status: 500, headers: { "Content-Type": "text/html" } });
  }
}