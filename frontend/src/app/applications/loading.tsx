export default function ApplicationsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading applications"
      className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-10 w-56 rounded bg-slate-200" />
            <div className="h-5 w-80 max-w-full rounded bg-slate-200" />
          </div>
          <div className="h-11 w-full rounded-lg bg-slate-200 sm:w-40" />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="h-12 bg-slate-100" />
          <div className="overflow-x-auto">
            <div className="min-w-2xl divide-y divide-slate-200 px-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="grid grid-cols-4 gap-8 py-5" key={index}>
                  <div className="h-5 rounded bg-slate-200" />
                  <div className="h-5 rounded bg-slate-100" />
                  <div className="h-6 w-20 rounded-full bg-slate-200" />
                  <div className="h-5 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
