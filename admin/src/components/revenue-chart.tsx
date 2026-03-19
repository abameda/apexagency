"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: { date: string; egp: number; usd: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [currency, setCurrency] = useState<"egp" | "usd">("egp");
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  // Aggregate data by period
  const chartData = aggregateByPeriod(data, period);

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-text-muted text-xs uppercase tracking-wider">Revenue Over Time</p>
        <div className="flex gap-2 mb-2">
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                period === p ? "bg-hover-strong text-text-primary" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrency("egp")}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              currency === "egp" ? "bg-hover-strong text-text-primary" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            EGP
          </button>
          <button
            onClick={() => setCurrency("usd")}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              currency === "usd" ? "bg-hover-strong text-text-primary" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            USD
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.15)"
            tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.15)"
            tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey={currency}
            stroke="#FFFFFF"
            strokeWidth={1.5}
            fill="url(#gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function aggregateByPeriod(
  data: { date: string; egp: number; usd: number }[],
  period: "daily" | "weekly" | "monthly"
) {
  if (period === "daily") return data;

  const grouped: Record<string, { egp: number; usd: number }> = {};

  data.forEach((d, i) => {
    let key: string;
    if (period === "weekly") {
      key = `W${Math.floor(i / 7) + 1}`;
    } else {
      // monthly — group by first date in each ~30 day block
      key = `M${Math.floor(i / 30) + 1}`;
    }
    if (!grouped[key]) grouped[key] = { egp: 0, usd: 0 };
    grouped[key].egp += d.egp;
    grouped[key].usd += d.usd;
  });

  return Object.entries(grouped).map(([date, vals]) => ({ date, ...vals }));
}
