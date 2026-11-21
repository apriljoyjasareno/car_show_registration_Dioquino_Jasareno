import RegistrationsPage from "./pages/RegistrationsPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="hero">
        <div className="flag-strip" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-300">
            AutoVista Events
          </p>
          <h1 className="mt-1 text-4xl font-extrabold">🏁 Car Show 2027</h1>
          <p className="mt-1 text-sm text-pink-100">Registration Dashboard</p>
        </div>
        <div className="checker-edge" />
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <RegistrationsPage />
      </main>
    </div>
  );
}