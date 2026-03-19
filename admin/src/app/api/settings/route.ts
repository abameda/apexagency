import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Public: get all settings
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase.from("settings").select("key, value");

  if (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  // Convert array to object
  const settings = Object.fromEntries(data.map((s) => [s.key, s.value]));
  return NextResponse.json(settings);
}

// Auth required: update settings
export async function PUT(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const admin = createAdminClient();

  // body is { key: value, key: value }
  for (const [key, value] of Object.entries(body)) {
    await admin
      .from("settings")
      .update({ value: String(value), updated_at: new Date().toISOString() })
      .eq("key", key);
  }

  return NextResponse.json({ success: true });
}
