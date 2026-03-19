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

    // Generate signed URLs for screenshots
    if (data) {
      for (const order of data) {
        const { data: urlData } = await supabase.storage
          .from("screenshots")
          .createSignedUrl(order.screenshot_url, 3600); // 1 hour
        order.screenshot_signed_url = urlData?.signedUrl || "";
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
    return <div className="text-text-muted text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-lg tracking-wider">PENDING REVIEWS</h1>
        <span className="bg-warning/10 text-warning text-xs px-3 py-1 rounded-full">
          {orders.length} pending
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-text-muted text-center py-12">
          No pending orders
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
