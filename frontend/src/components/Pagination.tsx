interface Props {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function getPageNumbers(page: number, totalPages: number): number[] {
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}

const baseBtn =
  "min-w-9 rounded-lg border px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:cursor-not-allowed disabled:opacity-40";

export default function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={loading || page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={`${baseBtn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
        >
          ‹ Prev
        </button>

        {getPageNumbers(page, totalPages).map((p) => (
          <button
            key={p}
            type="button"
            disabled={loading}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${baseBtn} ${
              p === page
                ? "border-pink-600 bg-pink-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          disabled={loading || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`${baseBtn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
        >
          Next ›
        </button>
      </div>

      <p className="text-sm text-slate-600">
        Showing {start}–{end} of {totalCount}
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-sm text-slate-600">
          Per page
        </label>
        <select
          id="pageSize"
          value={pageSize}
          disabled={loading}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-40"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}