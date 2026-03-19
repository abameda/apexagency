"use client";

import { useState } from "react";
import { ScreenshotViewer } from "./screenshot-viewer";
import { RejectDialog } from "./reject-dialog";

interface Order {
  id: string;
  full_name: string;
  email: string;
  mobile: string;
  screenshot_url: string;
  screenshot_signed_url?: string;
  price_paid: number;
  currency: string;
  region: string;
  status: string;
  created_at: string;
  payment_methods: { name: string } | null;
}

interface OrderCardProps {
  order: Order;
  showActions?: boolean;
  onAction?: () => void;
}

export function OrderCard({ order, showActions, onAction }: OrderCardProps) {
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [loading, setLoading] = useState(false);

  const screenshotUrl = order.screenshot_signed_url || "";
  const timeAgo = getTimeAgo(order.created_at);

  async function handleAction(action: "approve" | "reject", reason?: string) {
    setLoading(true);
    await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, rejection_reason: reason }),
    });
    setLoading(false);
    setShowReject(false);
    onAction?.();
  }

  return (
    <>
      <div className="bg-surface border border-border rounded-xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-text-primary font-medium">{order.full_name}</p>
            <p className="text-text-muted text-xs">{timeAgo}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            order.status === "pending" ? "bg-warning/10 text-warning" :
            order.status === "approved" ? "bg-success/10 text-success" :
            "bg-danger/10 text-danger"
          }`}>
            {order.status}
          </span>
        </div>

        <div className="space-y-1 text-sm mb-3">
          <p className="text-text-secondary">{order.email}</p>
          <p className="text-text-secondary">{order.mobile}</p>
          <p className="text-text-muted">
            {order.payment_methods?.name} — {order.price_paid.toLocaleString()} {order.currency}
          </p>
        </div>

        <button
          onClick={() => setShowScreenshot(true)}
          className="w-full bg-elevated border border-border rounded-lg p-3 text-text-secondary text-xs hover:bg-hover-subtle transition-colors mb-3"
        >
          View Screenshot
        </button>

        {showActions && order.status === "pending" && (
          <div className="flex gap-3">
            <button
              onClick={() => handleAction("approve")}
              disabled={loading}
              className="flex-1 py-2.5 text-sm bg-success text-white rounded-lg hover:bg-success/80 transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Approve"}
            </button>
            <button
              onClick={() => setShowReject(true)}
              disabled={loading}
              className="flex-1 py-2.5 text-sm bg-danger text-white rounded-lg hover:bg-danger/80 transition-colors disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        )}
      </div>

      {showScreenshot && (
        <ScreenshotViewer url={screenshotUrl} onClose={() => setShowScreenshot(false)} />
      )}

      {showReject && (
        <RejectDialog
          loading={loading}
          onConfirm={(reason) => handleAction("reject", reason)}
          onCancel={() => setShowReject(false)}
        />
      )}
    </>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
