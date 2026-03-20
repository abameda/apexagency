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
  const initials = order.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const formattedPrice = `${order.price_paid.toLocaleString()} ${order.currency}`;

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
      <div className="group bg-surface border border-border rounded-2xl p-5 hover:border-hover-strong transition-all duration-300">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-full bg-elevated border border-border flex items-center justify-center shrink-0">
            <span className="text-text-secondary text-xs font-medium tracking-wide">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-text-primary font-medium truncate">{order.full_name}</p>
              <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 font-medium ${
                order.status === "pending" ? "bg-warning/10 text-warning border border-warning/20" :
                order.status === "approved" ? "bg-success/10 text-success border border-success/20" :
                "bg-danger/10 text-danger border border-danger/20"
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-text-muted text-xs mt-0.5">{timeAgo}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-elevated/50 rounded-xl px-3.5 py-2.5">
            <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">Email</p>
            <p className="text-text-secondary text-sm truncate">{order.email}</p>
          </div>
          <div className="bg-elevated/50 rounded-xl px-3.5 py-2.5">
            <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">Mobile</p>
            <p className="text-text-secondary text-sm">{order.mobile}</p>
          </div>
          <div className="bg-elevated/50 rounded-xl px-3.5 py-2.5">
            <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">Payment</p>
            <p className="text-text-secondary text-sm">
              {order.payment_methods?.name} <span className="text-text-muted">·</span> <span className="text-text-primary font-medium">{formattedPrice}</span>
            </p>
          </div>
        </div>

        {/* Screenshot + Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScreenshot(true)}
            className="flex items-center gap-2 bg-elevated border border-border rounded-xl px-4 py-2.5 text-text-secondary text-xs hover:border-hover-strong hover:text-text-primary transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            View Receipt
          </button>

          <div className="flex items-center gap-2 ml-auto text-[10px] text-text-muted uppercase tracking-widest">
            <span className={`w-1.5 h-1.5 rounded-full ${order.region === "egypt" ? "bg-warning" : "bg-blue-400"}`} />
            {order.region}
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && order.status === "pending" && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-border">
            <button
              onClick={() => handleAction("approve")}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-success/10 text-success border border-success/20 rounded-xl hover:bg-success/20 transition-all duration-200 disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {loading ? "Processing..." : "Approve"}
            </button>
            <button
              onClick={() => setShowReject(true)}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-danger/10 text-danger border border-danger/20 rounded-xl hover:bg-danger/20 transition-all duration-200 disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
