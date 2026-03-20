"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { OrderCard } from "@/components/order-card";

export default function ClientsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      let query = supabase
        .from("orders")
        .select("*, payment_methods(name)")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      if (regionFilter !== "all") {
        query = query.eq("region", regionFilter);
      }

      const { data } = await query;

      // Generate public URLs for screenshots
      if (data) {
        for (const order of data) {
          const { data: urlData } = supabase.storage
            .from("screenshots")
            .getPublicUrl(order.screenshot_url);
          order.screenshot_signed_url = urlData?.publicUrl || "";
        }
      }

      setOrders(data || []);
      setLoading(false);
    }
    fetchData();
  }, [statusFilter, regionFilter]);

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.full_name.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.mobile.includes(q)
    );
  });

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    approved: orders.filter(o => o.status === "approved").length,
    rejected: orders.filter(o => o.status === "rejected").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-lg tracking-wider">ALL CLIENTS</h1>
          <p className="text-text-muted text-sm mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-2xl p-4 mb-6">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-elevated border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary/30 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status Tabs */}
            <div className="flex gap-1 bg-elevated rounded-xl p-1 flex-1">
              {(["all", "pending", "approved", "rejected"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex-1 text-xs uppercase tracking-wider py-2 px-3 rounded-lg transition-all duration-200 ${
                    statusFilter === status
                      ? "bg-surface text-text-primary shadow-sm border border-border"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {status}
                  {statusFilter === "all" && counts[status] > 0 && (
                    <span className="ml-1.5 text-text-muted">({counts[status]})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Region Select */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-elevated border border-border rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider text-text-secondary focus:outline-none focus:border-text-secondary/30 transition-colors sm:w-44"
            >
              <option value="all">All Regions</option>
              <option value="egypt">Egypt</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-border border-t-text-secondary rounded-full animate-spin" />
          <p className="text-text-muted text-sm">Loading orders...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-text-secondary font-medium">No results found</p>
            <p className="text-text-muted text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
            Showing {filtered.length} {filtered.length === 1 ? "order" : "orders"}
          </p>
          <div className="grid gap-4">
            {filtered.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
