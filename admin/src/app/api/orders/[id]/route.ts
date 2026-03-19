import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action, rejection_reason } = body;

  if (!["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  if (action === "reject" && !rejection_reason) {
    return NextResponse.json({ error: "Rejection reason required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Get order
  const { data: order, error: fetchError } = await admin
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "pending") {
    return NextResponse.json({ error: "Order already processed" }, { status: 400 });
  }

  // Update order
  const updateData: Record<string, unknown> = {
    status: action === "approve" ? "approved" : "rejected",
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
  };

  if (action === "reject") {
    updateData.rejection_reason = rejection_reason;
  }

  const { error: updateError } = await admin
    .from("orders")
    .update(updateData)
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }

  // Send email
  try {
    if (action === "approve") {
      await sendApprovalEmail(order.full_name, order.email);
    } else {
      await sendRejectionEmail(order.full_name, order.email, rejection_reason);
    }
  } catch (emailError) {
    console.error("Email send failed:", emailError);
    // Don't fail the request, order is already updated
  }

  return NextResponse.json({ status: updateData.status });
}
