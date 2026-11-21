import { useEffect, useState } from "react";
import { getRegistrations, getSummary } from "../api";
import type { PagedResult, RegistrationQuery, Summary } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import KpiCards from "../components/KpiCards";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import Pagination from "../components/Pagination";

const initialQuery: RegistrationQuery = {
  participantName: "",
  type: "",
  status: "",
  page: 1,
  pageSize: 10,
};

export default function RegistrationsPage() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  const [query, setQuery] = useState<RegistrationQuery>(initialQuery);
  const [data, setData] = useState<PagedResult | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // When the debounced search text changes, update the query and go back to page 1
  useEffect(() => {
    setQuery((q) =>
      q.participantName === debouncedSearch
        ? q
        : { ...q, participantName: debouncedSearch, page: 1 }
    );
  }, [debouncedSearch]);

  // KPI cards come from the summary endpoint
  useEffect(() => {
    let cancelled = false;
    getSummary()
      .then((s) => {
        if (!cancelled) setSummary(s);
      })
      .catch(() => {
        if (!cancelled) setError("Cannot reach the API. Please check that it is running.");
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // Table rows come from the registrations endpoint
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getRegistrations(query)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Cannot reach the API. Please check that it is running.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, reloadKey]);

  function handleClear() {
    setSearchInput("");
    setQuery((q) => ({ ...q, participantName: "", type: "", status: "", page: 1 }));
  }

  function handleRetry() {
    setSummary(null);
    setReloadKey((k) => k + 1);
  }

  const hasItems = data !== null && data.items.length > 0;

  return (
    <div className="space-y-6">
      {/* 1. KPI cards */}
      <KpiCards summary={summary} />

      {/* 2. Filters + table + pagination */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="table-hero flex flex-wrap items-end justify-between gap-4 p-5">
          <h2 className="text-2xl font-extrabold text-white">Registrations</h2>
          <RegistrationFilters
            search={searchInput}
            type={query.type}
            status={query.status}
            onSearchChange={setSearchInput}
            onTypeChange={(type) => setQuery((q) => ({ ...q, type, page: 1 }))}
            onStatusChange={(status) => setQuery((q) => ({ ...q, status, page: 1 }))}
            onClear={handleClear}
          />
        </div>

        {/* Error state */}
        {error && (
          <div className="p-10 text-center">
            <p className="text-base font-semibold text-red-700">⚠ {error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              ↻ Try again
            </button>
          </div>
        )}

        {/* First load */}
        {!error && data === null && (
          <p className="p-10 text-center text-slate-600">Loading registrations…</p>
        )}

        {/* Empty state */}
        {!error && data !== null && !hasItems && !loading && (
          <div className="p-10 text-center">
            <p className="text-base font-semibold text-slate-700">
              No registrations match your filters
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              ✖ Clear filters
            </button>
          </div>
        )}

        {/* Table + pagination */}
        {!error && data !== null && hasItems && (
          <>
            {loading && (
              <p className="bg-pink-50 px-4 py-2 text-sm font-medium text-pink-800">
                Loading registrations…
              </p>
            )}
            <div className={loading ? "opacity-50" : ""}>
              <RegistrationTable items={data.items} />
            </div>
            <Pagination
              page={data.page}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
              totalPages={data.totalPages}
              loading={loading}
              onPageChange={(page) => setQuery((q) => ({ ...q, page }))}
              onPageSizeChange={(pageSize) =>
                setQuery((q) => ({ ...q, pageSize, page: 1 }))
              }
            />
          </>
        )}
      </section>
    </div>
  );
}