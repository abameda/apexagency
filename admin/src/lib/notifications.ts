import { Resend } from "resend";
import { render } from "@react-email/components";
import AdminNotificationEmail from "@/emails/admin-notification";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderNotification {
  name: string;
  email: string;
  amount: string;
  currency: string;
  method: string;
}

export async function notifyAdmins(order: OrderNotification) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.ADMIN_EMAIL) {
    console.error("Missing email env vars:", {
      hasApiKey: !!process.env.RESEND_API_KEY,
      hasFrom: !!process.env.RESEND_FROM_EMAIL,
      hasAdmin: !!process.env.ADMIN_EMAIL,
    });
    return;
  }

  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL || "https://apexagency-dashboard.vercel.app";

  try {
    const html = await render(
      AdminNotificationEmail({
        customerName: order.name,
        customerEmail: order.email,
        amount: order.amount,
        currency: order.currency,
        method: order.method,
        dashboardUrl,
      })
    );

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New payment — ${order.name} — ${order.amount} ${order.currency}`,
      html,
    });
    console.log("Admin notification sent:", result);
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }
}
