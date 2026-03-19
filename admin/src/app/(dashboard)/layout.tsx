import { Sidebar } from "@/components/sidebar";
import { BottomNav } from "@/components/bottom-nav";
import { PushRegister } from "@/components/push-register";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <PushRegister />
      <Sidebar />
      <main className="md:ml-56 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
