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

    // Check if user has configured Web3Forms or Discord/Telegram webhook
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    if (web3formsKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          message,
          from_name: "Portfolio Contact Form",
        }),
      });
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
