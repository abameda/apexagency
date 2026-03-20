import { Resend } from "resend";
import { render } from "@react-email/components";
import ApprovalEmail from "@/emails/approval";
import RejectionEmail from "@/emails/rejection";
import { createAdminClient } from "./supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(customerName: string, customerEmail: string) {
  let downloadUrl: string | null = null;
  let manualUrl: string | null = null;

  // Try to generate signed URLs for theme files
  try {
    const supabase = createAdminClient();
    const { data: zipUrl } = await supabase.storage
      .from("theme-files")
      .createSignedUrl("apex-pro-theme.zip", 48 * 60 * 60);
    const { data: manual } = await supabase.storage
      .from("theme-files")
      .createSignedUrl("apex-pro-manual.pdf", 48 * 60 * 60);
    downloadUrl = zipUrl?.signedUrl || null;
    manualUrl = manual?.signedUrl || null;
  } catch {
    console.error("Could not generate download URLs — theme-files bucket may not exist");
  }

  const html = await render(
    ApprovalEmail({ customerName, downloadUrl, manualUrl })
  );

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: customerEmail,
    subject: "Your APEX Theme is Ready",
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
