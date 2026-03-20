import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { BottomNav } from "@/components/bottom-nav";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="md:ml-56 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
