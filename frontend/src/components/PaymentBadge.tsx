import type { PaymentStatus } from "../types";

const styles: Record<PaymentStatus, string> = {
  Unpaid: "bg-red-100 text-red-800 border-red-300",
  Partial: "bg-amber-100 text-amber-800 border-amber-300",
  Paid: "bg-green-100 text-green-800 border-green-300",
};

export default function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}