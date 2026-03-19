"use client";

import { useState } from "react";

interface RejectDialogProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  loading: boolean;
}

export function RejectDialog({ onConfirm, onCancel, loading }: RejectDialogProps) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-text-primary font-medium mb-4">Reject Payment</h3>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for rejection..."
          className="w-full bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary text-sm resize-none h-24 focus:outline-none focus:border-text-secondary"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm text-text-secondary border border-border rounded-lg hover:bg-hover-subtle transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => reason.trim() && onConfirm(reason.trim())}
            disabled={!reason.trim() || loading}
            className="flex-1 py-2.5 text-sm bg-danger text-white rounded-lg hover:bg-danger/80 transition-colors disabled:opacity-50"
          >
            {loading ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
