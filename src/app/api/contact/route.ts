import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Web3Forms integration (delivers to mahammadhussain1500@gmail.com)
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || "fb9b030a-a1bb-4973-bf86-2943a5cff9ed";
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    if (web3formsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            message,
            from_name: `${name} (Portfolio Contact)`,
            subject: `📬 New Portfolio Contact from ${name}`,
          }),
        });
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const result = await response.json();
          if (!result.success) {
            console.warn("[Web3Forms API result]", result);
          }
        }
      } catch (wfErr) {
        console.warn("[Web3Forms server-side delivery skipped/failed]", wfErr);
      }
    }

    if (discordWebhook) {
      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📬 **New Portfolio Transmission from ${name}** (${email}):\n\n${message}`,
        }),
      });
    }

    console.log(`[Contact Form] Message from ${name} (${email}): ${message}`);

    return NextResponse.json({
      success: true,
      message: "Transmission received! Mahammad will get back to you shortly.",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
