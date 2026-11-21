interface Props {
  search: string;
  type: string;
  status: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const inputClass =
  "rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300";

export default function RegistrationFilters({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="search" className="text-xs font-semibold text-pink-200">
          Participant name
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search participant name…"
          className={`${inputClass} w-64`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-xs font-semibold text-pink-200">
          Registration type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className={inputClass}
        >
          <option value="">All types</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-xs font-semibold text-pink-200">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={inputClass}
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
      >
        ✖ Clear filters
      </button>
    </div>
  );
}