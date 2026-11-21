import type { RegistrationStatus } from "../types";

const styles: Record<RegistrationStatus, string> = {
  Pending: "bg-slate-100 text-slate-700 border-slate-300",
  Confirmed: "bg-blue-100 text-blue-800 border-blue-300",
  CheckedIn: "bg-green-100 text-green-800 border-green-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
};

const labels: Record<RegistrationStatus, string> = {
  Pending: "Pending",
  Confirmed: "Confirmed",
  CheckedIn: "Checked In",
  Cancelled: "Cancelled",
};

export default function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}