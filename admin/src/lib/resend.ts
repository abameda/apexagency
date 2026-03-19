import { Resend } from "resend";
import { render } from "@react-email/components";
import ApprovalEmail from "@/emails/approval";
import RejectionEmail from "@/emails/rejection";
import { createAdminClient } from "./supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(customerName: string, customerEmail: string) {
  const supabase = createAdminClient();

  // Generate signed URLs for theme files (48 hours)
  const { data: zipUrl } = await supabase.storage
    .from("theme-files")
    .createSignedUrl("apex-pro-theme.zip", 48 * 60 * 60);

  const { data: manualUrl } = await supabase.storage
    .from("theme-files")
    .createSignedUrl("apex-pro-manual.pdf", 48 * 60 * 60);

  if (!zipUrl?.signedUrl || !manualUrl?.signedUrl) {
    throw new Error("Failed to generate download URLs");
  }

  const html = await render(
    ApprovalEmail({
      customerName,
      downloadUrl: zipUrl.signedUrl,
      manualUrl: manualUrl.signedUrl,
    })
  );

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: customerEmail,
    subject: "Your APEX Theme is Ready ✓",
    html,
  });
}

export async function sendRejectionEmail(
  customerName: string,
  customerEmail: string,
  reason: string
) {
  const html = await render(
    RejectionEmail({ customerName, reason })
  );

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: customerEmail,
    subject: "Payment Verification Update — APEX",
    html,
  });
}
