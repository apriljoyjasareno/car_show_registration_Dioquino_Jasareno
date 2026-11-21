import type { CSSProperties } from "react";
import KpiCard from "./KpiCard";
import type { Summary } from "../types";
import { formatCurrency } from "../utils/format";

export default function KpiCards({ summary }: { summary: Summary | null }) {
  const loading = summary === null;

  const collectionRate =
    summary && summary.totalFees > 0
      ? (summary.totalPayments / summary.totalFees) * 100
      : 0;

  const showcaseStyle = { "--card-image": "url('/images/cars.svg')" } as CSSProperties;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Total Registrations"
        icon="📋"
        image="/images/total.svg"
        loading={loading}
        value={String(summary?.totalRegistrations ?? 0)}
      />
      <KpiCard
        label="Total Payments"
        icon="💰"
        image="/images/payments.svg"
        loading={loading}
        value={formatCurrency(summary?.totalPayments ?? 0)}
      />
      <KpiCard
        label="Uncollected Payments"
        icon="⏳"
        image="/images/uncollected.svg"
        loading={loading}
        value={formatCurrency(summary?.uncollectedPayments ?? 0)}
      />
      <KpiCard
        label="Confirmed"
        icon="✅"
        image="/images/confirmed.svg"
        loading={loading}
        value={String(summary?.confirmed ?? 0)}
      />
      <KpiCard
        label="Checked In"
        icon="🚗"
        image="/images/checkedin.svg"
        loading={loading}
        value={String(summary?.checkedIn ?? 0)}
      />
      <KpiCard
        label="Pending / Cancelled"
        icon="📝"
        image="/images/pending.svg"
        loading={loading}
        value={`${summary?.pending ?? 0} / ${summary?.cancelled ?? 0}`}
      />
      <KpiCard
        label="Collection Rate"
        icon="📈"
        image="/images/rate.svg"
        loading={loading}
        value={`${collectionRate.toFixed(1)}%`}
      />

      <div
        className="kpi-card kpi-card--showcase flex flex-col justify-end"
        style={showcaseStyle}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-pink-300">
          Sorsogon City Coliseum
        </p>
        <p className="text-xl font-extrabold text-white">3-Day Car Show</p>
      </div>
    </div>
  );
}