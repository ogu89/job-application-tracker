"use client";

import Link from "next/link";

export default function ApplicationDetailError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-xl border border-rose-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
          Unable to load application
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Make sure the NestJS backend is running on port 3001, then try again.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            href="/applications"
          >
            Back to applications
          </Link>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => unstable_retry()}
            type="button"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
