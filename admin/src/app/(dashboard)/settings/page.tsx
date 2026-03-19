"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaymentMethodForm } from "@/components/payment-method-form";

export default function SettingsPage() {
  const supabase = createClient();
  const [methods, setMethods] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [editingMethod, setEditingMethod] = useState<any | null>(null);
  const [addingMethod, setAddingMethod] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: m } = await supabase
      .from("payment_methods")
      .select("*")
      .order("display_order");
    setMethods(m || []);

    const res = await fetch("/api/settings");
    const s = await res.json();
    setSettings(s);
  }

  async function deleteMethod(id: string) {
    if (!confirm("Delete this payment method?")) return;
    await fetch("/api/payment-methods", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  }

  async function saveMethod(data: any) {
    if (editingMethod) {
      await fetch("/api/payment-methods", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingMethod.id, ...data }),
      });
    } else {
      await fetch("/api/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, display_order: methods.length + 1 }),
      });
    }
    setEditingMethod(null);
    setAddingMethod(false);
    fetchData();
  }

  async function savePricing() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
  }

  return (
    <div>
      <h1 className="font-heading text-lg tracking-wider mb-6">SETTINGS</h1>

      {/* Pricing */}
      <section className="bg-surface border border-border rounded-xl p-5 mb-6">
        <h2 className="text-text-secondary text-xs uppercase tracking-wider mb-4">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-text-muted text-xs mb-1">Egypt Price (EGP)</label>
            <input
              value={settings.price_egypt || ""}
              onChange={(e) => setSettings({ ...settings, price_egypt: e.target.value })}
              className="w-full bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-secondary"
            />
          </div>
          <div>
            <label className="block text-text-muted text-xs mb-1">International Price (USD)</label>
            <input
              value={settings.price_international || ""}
              onChange={(e) => setSettings({ ...settings, price_international: e.target.value })}
              className="w-full bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-secondary"
            />
          </div>
        </div>
        <button
          onClick={savePricing}
          disabled={saving}
          className="bg-text-primary text-bg text-sm px-6 py-2.5 rounded-lg hover:bg-text-secondary transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Pricing"}
        </button>
      </section>

      {/* Payment Methods */}
      <section className="bg-surface border border-border rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-text-secondary text-xs uppercase tracking-wider">Payment Methods</h2>
          <button
            onClick={() => { setAddingMethod(true); setEditingMethod(null); }}
            className="text-xs text-text-primary bg-hover-strong px-3 py-1.5 rounded-lg hover:bg-hover-subtle transition-colors"
          >
            + Add
          </button>
        </div>

        {(addingMethod || editingMethod) && (
          <div className="mb-4 p-4 bg-elevated rounded-lg border border-border">
            <PaymentMethodForm
              method={editingMethod}
              onSave={saveMethod}
              onCancel={() => { setAddingMethod(false); setEditingMethod(null); }}
            />
          </div>
        )}

        <div className="space-y-3">
          {methods.map((m) => (
            <div key={m.id} className="flex items-center justify-between py-2">
              <div>
                <p className="text-text-primary text-sm">{m.name}</p>
                <p className="text-text-muted text-xs">{m.account_name} — {m.handle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${m.is_active ? "text-success" : "text-text-muted"}`}>
                  {m.is_active ? "Active" : "Inactive"}
                </span>
                <button
                  onClick={() => { setEditingMethod(m); setAddingMethod(false); }}
                  className="text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMethod(m.id)}
                  className="text-xs text-danger hover:text-danger/80 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Users */}
      <section className="bg-surface border border-border rounded-xl p-5 mb-6">
        <h2 className="text-text-secondary text-xs uppercase tracking-wider mb-4">Admin Users</h2>
        <p className="text-text-muted text-xs mb-4">
          Manage who has access to this dashboard. New admins receive an invite email.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="New admin email..."
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="flex-1 bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary"
          />
          <button
            onClick={async () => {
              if (!newAdminEmail) return;
              await fetch("/api/admin-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newAdminEmail }),
              });
              setNewAdminEmail("");
              fetchData();
            }}
            className="bg-text-primary text-bg text-sm px-4 py-2.5 rounded-lg hover:bg-text-secondary transition-colors"
          >
            Invite
          </button>
        </div>
      </section>
    </div>
  );
}
