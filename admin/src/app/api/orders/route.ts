import { createAdminClient } from "@/lib/supabase/admin";
import { normalizePhone } from "@/lib/phone";
import { notifyAdmins } from "@/lib/notifications";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { full_name, email, mobile, country_code, payment_method_id, screenshot_url, price_paid, currency, region } = body;

  // Validate required fields
  if (!full_name || !email || !mobile || !country_code || !payment_method_id || !screenshot_url || !price_paid || !currency || !region) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const normalizedMobile = normalizePhone(country_code, mobile);

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      full_name,
      email,
      mobile: normalizedMobile,
      payment_method_id,
      screenshot_url,
      status: "pending",
      price_paid,
      currency,
      region,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }

  // Fetch payment method name for notification
  const { data: method } = await supabase
    .from("payment_methods")
    .select("name")
    .eq("id", payment_method_id)
    .single();

  // Send notifications (non-blocking)
  notifyAdmins({
    name: full_name,
    email,
    amount: String(price_paid),
    currency,
    method: method?.name || "Unknown",
  }).catch(console.error);

  return NextResponse.json({ id: data.id, status: "pending" }, { status: 201 });
}
