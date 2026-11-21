import type { PagedResult, RegistrationQuery, Summary } from "../types";

const BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5205";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }
  return (await response.json()) as T;
}

export function getRegistrations(query: RegistrationQuery): Promise<PagedResult> {
  const params = new URLSearchParams();
  if (query.participantName.trim()) {
    params.set("participantName", query.participantName.trim());
  }
  if (query.type) params.set("type", query.type);
  if (query.status) params.set("status", query.status);
  params.set("page", String(query.page));
  params.set("pageSize", String(query.pageSize));

  return request<PagedResult>(`/api/registrations?${params.toString()}`);
}

export function getSummary(): Promise<Summary> {
  return request<Summary>("/api/registrations/summary");
}