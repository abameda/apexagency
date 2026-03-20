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
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div>
            <h3 className="text-text-primary font-medium">Reject Payment</h3>
            <p className="text-text-muted text-xs mt-0.5">This will notify the client via email</p>
          </div>
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for rejection..."
          className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary text-sm resize-none h-28 focus:outline-none focus:border-danger/30 transition-colors placeholder:text-text-muted"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm text-text-secondary border border-border rounded-xl hover:bg-hover-subtle hover:border-hover-strong transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => reason.trim() && onConfirm(reason.trim())}
            disabled={!reason.trim() || loading}
            className="flex-1 py-2.5 text-sm bg-danger/10 text-danger border border-danger/20 rounded-xl hover:bg-danger/20 transition-all duration-200 disabled:opacity-50 font-medium"
          >
            {loading ? "Rejecting..." : "Confirm Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
