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
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.ADMIN_EMAIL) {
    console.error("Missing email env vars:", {
      hasApiKey: !!process.env.RESEND_API_KEY,
      hasFrom: !!process.env.RESEND_FROM_EMAIL,
      hasAdmin: !!process.env.ADMIN_EMAIL,
    });
    return;
  }

  const safeName = escapeHtml(order.name);
  const safeEmail = escapeHtml(order.email);
  const safeAmount = escapeHtml(order.amount);
  const safeCurrency = escapeHtml(order.currency);
  const safeMethod = escapeHtml(order.method);
  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL || "https://apexagency-dashboard.vercel.app";

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `💰 New payment — ${order.name} — ${order.amount} ${order.currency}`,
      html: `
        <div style="background-color:#0A0A0A;margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;">
          <div style="max-width:520px;margin:0 auto;padding:40px 20px;">
            <p style="color:#FFFFFF;font-size:18px;font-weight:300;letter-spacing:6px;text-align:center;margin:0 0 32px;">A P E X</p>
            <div style="background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;overflow:hidden;">
              <div style="display:inline-block;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:8px;padding:6px 14px;margin-bottom:20px;">
                <span style="color:#F59E0B;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">New Order</span>
              </div>
              <p style="color:#FFFFFF;font-size:22px;font-weight:500;margin:0 0 4px;">${safeName}</p>
              <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0 0 24px;">${safeEmail}</p>
              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:rgba(255,255,255,0.35);font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">Amount</td>
                    <td style="color:#FFFFFF;font-size:16px;font-weight:600;text-align:right;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${safeAmount} ${safeCurrency}</td>
                  </tr>
                  <tr>
                    <td style="color:rgba(255,255,255,0.35);font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:10px 0;">Method</td>
                    <td style="color:rgba(255,255,255,0.7);font-size:14px;text-align:right;padding:10px 0;">${safeMethod}</td>
                  </tr>
                </table>
              </div>
              <a href="${dashboardUrl}/pending" style="display:block;background:#FFFFFF;color:#0A0A0A;text-align:center;padding:14px 24px;border-radius:10px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:1px;margin-top:24px;">REVIEW ORDER</a>
            </div>
            <div style="text-align:center;margin-top:32px;">
              <p style="color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:1px;margin:0 0 12px;">APEX AGENCY</p>
              <p style="margin:0 0 12px;">
                <a href="https://apexagencyxo.vercel.app" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:none;margin-right:16px;">Website</a>
                <a href="https://instagram.com/apexagency.xo" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:none;margin-right:16px;">Instagram</a>
                <a href="https://apexagencyxo.vercel.app/#contact" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:none;">Contact</a>
              </p>
              <p style="color:rgba(255,255,255,0.15);font-size:10px;margin:0;">&copy; 2026 APEX Agency. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log("Admin notification sent:", result);
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }
}
