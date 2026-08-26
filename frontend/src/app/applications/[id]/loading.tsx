export default function ApplicationDetailLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading application"
      className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-6 h-5 w-36 rounded bg-slate-200" />
        <div className="mb-8 space-y-3">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-10 w-64 rounded bg-slate-200" />
          <div className="h-6 w-48 rounded bg-slate-200" />
        </div>
        <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="space-y-2" key={index}>
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-11 rounded bg-slate-100" />
            </div>
          ))}
          <div className="space-y-2 sm:col-span-2">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-36 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
