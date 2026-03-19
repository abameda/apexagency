"use client";

import { useState } from "react";

interface PaymentMethod {
  id?: string;
  name: string;
  account_name: string;
  handle: string;
  qr_code_url: string | null;
  direct_link: string | null;
  is_active: boolean;
  display_order: number;
}

interface Props {
  method?: PaymentMethod;
  onSave: (data: Partial<PaymentMethod>) => Promise<void>;
  onCancel: () => void;
}

export function PaymentMethodForm({ method, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name: method?.name || "",
    account_name: method?.account_name || "",
    handle: method?.handle || "",
    direct_link: method?.direct_link || "",
    is_active: method?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-text-secondary text-xs uppercase tracking-wider mb-1">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-secondary"
        />
      </div>
      <div>
        <label className="block text-text-secondary text-xs uppercase tracking-wider mb-1">Account Name</label>
        <input
          value={form.account_name}
          onChange={(e) => setForm({ ...form, account_name: e.target.value })}
          required
          className="w-full bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-secondary"
        />
      </div>
      <div>
        <label className="block text-text-secondary text-xs uppercase tracking-wider mb-1">Handle / Number</label>
        <input
          value={form.handle}
          onChange={(e) => setForm({ ...form, handle: e.target.value })}
          className="w-full bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-secondary"
        />
      </div>
      <div>
        <label className="block text-text-secondary text-xs uppercase tracking-wider mb-1">Direct Payment Link</label>
        <input
          value={form.direct_link}
          onChange={(e) => setForm({ ...form, direct_link: e.target.value })}
          placeholder="https://..."
          className="w-full bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          className="rounded"
        />
        Active (visible to customers)
      </label>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 text-sm text-text-secondary border border-border rounded-lg hover:bg-hover-subtle transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2.5 text-sm bg-text-primary text-bg rounded-lg hover:bg-text-secondary transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : method ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
