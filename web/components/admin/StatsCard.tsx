interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  description?: string;
  trend?: { value: number; label: string };
}

export default function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-secondary text-sm font-medium">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      {description && (
        <p className="text-text-tertiary text-xs mt-1">{description}</p>
      )}
      {trend && (
        <p
          className={`text-xs mt-2 font-medium ${
            trend.value >= 0 ? "text-success" : "text-error"
          }`}
        >
          {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
        </p>
      )}
    </div>
  );
}
