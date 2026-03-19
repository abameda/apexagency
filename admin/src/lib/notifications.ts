import { Resend } from "resend";
import webpush from "web-push";
import { createAdminClient } from "./supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderNotification {
  name: string;
  email: string;
  amount: string;
  currency: string;
  method: string;
}

export async function notifyAdmins(order: OrderNotification) {
  const message = `New APEX order from ${order.name} - ${order.amount} ${order.currency} via ${order.method}. Review now.`;

  // 1. Email notification
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: `New payment from ${order.name} — ${order.method} — ${order.amount} ${order.currency}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Payment Submission</h2>
        <p><strong>Customer:</strong> ${order.name} (${order.email})</p>
        <p><strong>Amount:</strong> ${order.amount} ${order.currency}</p>
        <p><strong>Method:</strong> ${order.method}</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/pending">Review in Dashboard</a></p>
      </div>
    `,
  });

  // 2. WhatsApp via CallMeBot
  if (process.env.CALLMEBOT_PHONE && process.env.CALLMEBOT_API_KEY) {
    const encoded = encodeURIComponent(message);
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${encoded}&apikey=${process.env.CALLMEBOT_API_KEY}`
    ).catch(() => {
      // Non-critical, don't fail the request
    });
  }

  // 3. Web push notifications
  if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      "mailto:admin@apexagencyxo.com",
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const supabase = createAdminClient();
    const { data: subs } = await supabase
      .from("settings")
      .select("value")
      .like("key", "push_sub_%");

    for (const sub of subs || []) {
      webpush
        .sendNotification(
          JSON.parse(sub.value),
          JSON.stringify({
            title: `New order from ${order.name}`,
            body: `${order.amount} ${order.currency} via ${order.method}`,
            url: "/pending",
          })
        )
        .catch(() => {});
    }
  }
}
