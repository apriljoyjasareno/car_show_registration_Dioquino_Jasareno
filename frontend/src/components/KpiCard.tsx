import type { CSSProperties } from "react";

interface KpiCardProps {
  label: string;
  value: string;
  image: string;
  icon?: string;
  loading?: boolean;
}

export default function KpiCard({ label, value, image, loading }: KpiCardProps) {
  const style = { "--card-image": `url('${image}')` } as CSSProperties;

  return (
    <div className="kpi-card" style={style}>
      <p className="text-sm font-semibold uppercase tracking-wide text-pink-200">
        {label}
      </p>
      <p
        className={`mt-3 text-3xl font-extrabold text-white ${
          loading ? "animate-pulse text-pink-200" : ""
        }`}
      >
        {loading ? "••••" : value}
      </p>
    </div>
  );
}