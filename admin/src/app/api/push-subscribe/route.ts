import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscription = await request.json();
  const admin = createAdminClient();

  // Store in settings as JSON (simple approach for 2-3 admins)
  const key = `push_sub_${user.id}`;
  await admin.from("settings").upsert({
    key,
    value: JSON.stringify(subscription),
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
