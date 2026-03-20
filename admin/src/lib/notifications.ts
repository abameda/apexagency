import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderNotification {
  name: string;
  email: string;
  amount: string;
  currency: string;
  method: string;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function notifyAdmins(order: OrderNotification) {
  const safeName = escapeHtml(order.name);
  const safeEmail = escapeHtml(order.email);
  const safeAmount = escapeHtml(order.amount);
  const safeCurrency = escapeHtml(order.currency);
  const safeMethod = escapeHtml(order.method);
  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL || "https://apexagency-dashboard.vercel.app";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: `New payment from ${order.name} — ${order.method} — ${order.amount} ${order.currency}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0A; margin: 0; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto;">
          <p style="color: #FFFFFF; font-size: 20px; font-weight: 300; letter-spacing: 4px; text-align: center; margin-bottom: 32px;">APEX</p>
          <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 32px;">
            <p style="color: #F59E0B; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">New Order</p>
            <p style="color: #FFFFFF; font-size: 18px; font-weight: 400; margin-bottom: 16px;">${safeName}</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 8px 0;">Email</td><td style="color: rgba(255,255,255,0.7); font-size: 13px; text-align: right;">${safeEmail}</td></tr>
              <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 8px 0;">Amount</td><td style="color: #FFFFFF; font-size: 13px; text-align: right; font-weight: 500;">${safeAmount} ${safeCurrency}</td></tr>
              <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 8px 0;">Method</td><td style="color: rgba(255,255,255,0.7); font-size: 13px; text-align: right;">${safeMethod}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
            <a href="${dashboardUrl}/pending" style="display: block; background-color: #FFFFFF; color: #0A0A0A; text-align: center; padding: 14px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none;">REVIEW ORDER</a>
          </div>
          <p style="color: rgba(255,255,255,0.25); font-size: 11px; text-align: center; margin-top: 32px;">APEX Agency — Premium Shopify Themes</p>
        </div>
      </div>
    `,
  });
}
