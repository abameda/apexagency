import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/stats-card";
import { RevenueChart } from "@/components/revenue-chart";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch order counts
  const { count: pendingCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: approvedCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  const { count: rejectedCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "rejected");

  // Fetch revenue
  const { data: approvedOrders } = await supabase
    .from("orders")
    .select("price_paid, currency, created_at")
    .eq("status", "approved");

  const totalEGP = approvedOrders
    ?.filter((o) => o.currency === "EGP")
    .reduce((sum, o) => sum + Number(o.price_paid), 0) || 0;

  const totalUSD = approvedOrders
    ?.filter((o) => o.currency === "USD")
    .reduce((sum, o) => sum + Number(o.price_paid), 0) || 0;

  // Build chart data (last 30 days)
  const chartData = buildChartData(approvedOrders || []);

  // Payment method breakdown
  const { data: methodBreakdown } = await supabase
    .from("orders")
    .select("payment_method_id, payment_methods(name)")
    .eq("status", "approved");

  const methodCounts: Record<string, number> = {};
  methodBreakdown?.forEach((o: Record<string, unknown>) => {
    const name = (o.payment_methods as Record<string, string>)?.name || "Unknown";
    methodCounts[name] = (methodCounts[name] || 0) + 1;
  });

  return (
    <div>
      <h1 className="font-heading text-lg tracking-wider mb-6">DASHBOARD</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatsCard label="Pending" value={pendingCount || 0} highlight={!!pendingCount} />
        <StatsCard label="Approved" value={approvedCount || 0} />
        <StatsCard label="Rejected" value={rejectedCount || 0} />
        <StatsCard label="Total Orders" value={(pendingCount || 0) + (approvedCount || 0) + (rejectedCount || 0)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <StatsCard label="Revenue (EGP)" value={`${totalEGP.toLocaleString()} LE`} />
        <StatsCard label="Revenue (USD)" value={`$${totalUSD.toLocaleString()}`} />
      </div>

      <RevenueChart data={chartData} />

      {Object.keys(methodCounts).length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-5 mt-6">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-4">Payment Methods</p>
          <div className="space-y-3">
            {Object.entries(methodCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([name, count]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">{name}</span>
                  <span className="text-text-primary text-sm font-medium">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function buildChartData(orders: { price_paid: number; currency: string; created_at: string }[]) {
  const days = 30;
  const data: { date: string; egp: number; usd: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const label = `${date.getMonth() + 1}/${date.getDate()}`;

    const dayOrders = orders.filter(
      (o) => o.created_at.split("T")[0] === dateStr
    );

    data.push({
      date: label,
      egp: dayOrders.filter((o) => o.currency === "EGP").reduce((s, o) => s + Number(o.price_paid), 0),
      usd: dayOrders.filter((o) => o.currency === "USD").reduce((s, o) => s + Number(o.price_paid), 0),
    });
  }

  return data;
}
