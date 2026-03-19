interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  highlight?: boolean;
}

export function StatsCard({ label, value, trend, highlight }: StatsCardProps) {
  return (
    <div
      className={`bg-surface border rounded-xl p-5 ${
        highlight ? "border-warning" : "border-border"
      }`}
    >
      <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className={`text-2xl font-medium ${highlight ? "text-warning" : "text-text-primary"}`}>
        {value}
      </p>
      {trend && (
        <p className="text-text-secondary text-xs mt-1">{trend}</p>
      )}
    </div>
  );
}
