import type { Registration } from "../types";
import { formatCurrency, formatDate } from "../utils/format";
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

export default function RegistrationTable({ items }: { items: Registration[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-black text-xs uppercase tracking-wide text-pink-200">
          <tr>
            <th className="px-4 py-3">Reg. No.</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Participant</th>
            <th className="px-4 py-3">Car</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Fee / Paid</th>
            <th className="px-4 py-3">Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((r) => (
            <tr key={r.id} className="hover:bg-pink-50">
              <td className="whitespace-nowrap px-4 py-3 font-mono font-semibold text-slate-800">
                {r.registrationNumber}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {formatDate(r.registrationDate)}
              </td>
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-900">{r.participantName}</div>
                <div className="text-xs text-slate-500">
                  {r.contactNumber} · {r.email}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-slate-900">{r.carMakeModel}</div>
                <div className="text-xs text-slate-500">{r.plateNumber}</div>
              </td>
              <td className="px-4 py-3 text-slate-700">{r.registrationType}</td>
              <td className="px-4 py-3">
                <StatusBadge status={r.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <div className="font-semibold text-slate-900">
                  {formatCurrency(r.registrationFee)}
                </div>
                <div className="text-xs text-slate-500">
                  {formatCurrency(r.amountPaid)} paid
                </div>
              </td>
              <td className="px-4 py-3">
                <PaymentBadge status={r.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}