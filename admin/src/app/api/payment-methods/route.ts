import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Public: get active payment methods
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("payment_methods")
    .select("id, name, account_name, handle, qr_code_url, direct_link")
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// Auth required: create payment method
export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, account_name, handle, qr_code_url, direct_link, is_active, display_order } = body;
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("payment_methods")
    .insert({ name, account_name, handle, qr_code_url, direct_link, is_active, display_order })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// Auth required: update payment method
export async function PUT(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, name, account_name, handle, qr_code_url, direct_link, is_active, display_order } = body;
  const admin = createAdminClient();

  const { error } = await admin
    .from("payment_methods")
    .update({ name, account_name, handle, qr_code_url, direct_link, is_active, display_order, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// Auth required: delete payment method
export async function DELETE(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const admin = createAdminClient();

  const { error } = await admin
    .from("payment_methods")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
