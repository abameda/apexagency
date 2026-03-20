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

  return (
    <div>
      <h1 className="font-heading text-lg tracking-wider mb-6">ALL CLIENTS</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search name, email, or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-secondary focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-secondary focus:outline-none"
        >
          <option value="all">All Regions</option>
          <option value="egypt">Egypt</option>
          <option value="international">International</option>
        </select>
      </div>

      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-text-muted text-center py-12">No orders found</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}
