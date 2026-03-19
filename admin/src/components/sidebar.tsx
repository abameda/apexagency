"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/pending", label: "Pending", icon: "⏳" },
  { href: "/clients", label: "Clients", icon: "👥" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex flex-col w-56 h-screen bg-surface border-r border-border p-4 fixed left-0 top-0">
      <div className="font-heading text-sm tracking-[4px] mb-8 px-2">APEX</div>
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-hover-strong text-text-primary"
                  : "text-text-secondary hover:bg-hover-subtle hover:text-text-primary"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleSignOut}
        className="text-text-muted text-sm hover:text-text-secondary transition-colors px-3 py-2"
      >
        Sign out
      </button>
    </aside>
  );
}
