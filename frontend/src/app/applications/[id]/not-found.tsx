import Link from "next/link";

export default function ApplicationNotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
          Application not found
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          This application does not exist
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          It may have been removed, or the link may contain an incorrect ID.
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
          href="/applications"
        >
          Back to applications
        </Link>
      </section>
    </main>
  );
}
