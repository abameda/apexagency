"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { OrderCard } from "@/components/order-card";

export default function PendingPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*, payment_methods(name)")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

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

  useEffect(() => {
    fetchOrders();

    // Real-time subscription for new orders
    const channel = supabase
      .channel("pending-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: "status=eq.pending" },
        () => fetchOrders()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 border-2 border-border border-t-text-secondary rounded-full animate-spin" />
        <p className="text-text-muted text-sm">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-lg tracking-wider">PENDING REVIEWS</h1>
          <p className="text-text-muted text-sm mt-1">Review and approve incoming orders</p>
        </div>
        {orders.length > 0 && (
          <span className="relative flex items-center gap-2 bg-warning/10 text-warning text-xs font-medium px-3.5 py-1.5 rounded-full border border-warning/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-warning" />
            </span>
            {orders.length} pending
          </span>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-text-secondary font-medium">All caught up</p>
            <p className="text-text-muted text-sm mt-1">No pending orders to review</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              showActions
              onAction={fetchOrders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
