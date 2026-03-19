"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "📊" },
  { href: "/pending", label: "Pending", icon: "⏳" },
  { href: "/clients", label: "Clients", icon: "👥" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 min-w-[64px] ${
                isActive ? "text-text-primary" : "text-text-muted"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-[10px] uppercase tracking-wider">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
